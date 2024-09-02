import WebSocket, { type Data } from 'isomorphic-ws'
import { nanoid } from 'nanoid'
import type {
  AllHandlers,
  APIRequest,
  EventHandle,
  NCWebsocketOptions,
  ResponseHandler,
  WSReconnection,
  WSSendParam,
  WSSendReturn
} from './Interfaces.js'
import { NCEventBus } from './NCEventBus.js'
import { convertCQCodeToJSON, CQCodeDecode, logger } from './Utils.js'

export class NCWebsocketBase {
  #debug: boolean

  #baseUrl: string
  #accessToken: string
  #reconnection: WSReconnection
  #socket?: WebSocket

  #eventBus: NCEventBus
  #echoMap: Map<string, ResponseHandler>

  constructor(NCWebsocketOptions: NCWebsocketOptions, debug = false) {
    this.#accessToken = NCWebsocketOptions.accessToken ?? ''

    if ('baseUrl' in NCWebsocketOptions) {
      this.#baseUrl = NCWebsocketOptions.baseUrl
    } else if (
      'protocol' in NCWebsocketOptions &&
      'host' in NCWebsocketOptions &&
      'port' in NCWebsocketOptions
    ) {
      const { protocol, host, port } = NCWebsocketOptions
      this.#baseUrl = protocol + '://' + host + ':' + port
    } else {
      throw new Error(
        'NCWebsocketOptions must contain either "protocol && host && port" or "baseUrl"'
      )
    }

    // 整理重连参数
    const { enable = true, attempts = 10, delay = 5000 } = NCWebsocketOptions.reconnection ?? {}
    this.#reconnection = { enable, attempts, delay, nowAttempts: 1 }

    this.#debug = debug
    this.#eventBus = new NCEventBus(this.#debug)
    this.#echoMap = new Map()
  }

  // ==================WebSocket操作=============================

  connect() {
    this.#eventBus.emit('socket.connecting', { reconnection: this.#reconnection })
    const socket = new WebSocket(`${this.#baseUrl}/event?access_token=${this.#accessToken}`)
    socket.onopen = () => {
      this.#eventBus.emit('socket.open', { reconnection: this.#reconnection })
      this.#reconnection.nowAttempts = 1
    }
    socket.onclose = (event) => {
      this.#eventBus.emit('socket.close', {
        code: event.code,
        reason: event.reason,
        reconnection: this.#reconnection
      })
      this.#socket = undefined
      if (
        this.#reconnection.enable &&
        this.#reconnection.nowAttempts < this.#reconnection.attempts
      ) {
        this.#reconnection.nowAttempts++
        setTimeout(this.reconnect.bind(this), this.#reconnection.delay)
      }
    }
    socket.onmessage = (event) => this.#message(event.data)
    socket.onerror = (event) => {
      event.error.reconnection = this.#reconnection
      this.#eventBus.emit('socket.error', event.error)
    }
    this.#socket = socket
  }

  disconnect() {
    if (this.#socket !== undefined) {
      this.#socket.close(1000)
      this.#socket = undefined
    }
  }

  reconnect() {
    this.disconnect()
    this.connect()
  }

  #message(data: Data) {
    let json
    try {
      json = JSON.parse(data.toString())
      if (json.post_type === 'message' || json.post_type === 'message_sent') {
        if (json.message_format === 'string') {
          json = JSON.parse(CQCodeDecode(json))
          json.message = convertCQCodeToJSON(json.message)
          json.message_format = 'array'
        }
        json.raw_message = CQCodeDecode(json.raw_message)
      }
    } catch (error) {
      logger.warn('[node-napcat-ts]', '[socket]', 'failed to parse JSON')
      logger.dir(error)
      return
    }

    if (this.#debug) {
      logger.debug('[node-napcat-ts]', '[socket]', 'receive data')
      logger.dir(json)
    }

    if (json.echo) {
      const handler = this.#echoMap.get(json.echo)

      if (handler) {
        if (json.retcode === 0) {
          this.#eventBus.emit('api.response.success', json)
          handler.onSuccess(json)
        } else {
          this.#eventBus.emit('api.response.failure', json)
          handler.onFailure(json)
        }
      }
    } else {
      this.#eventBus.parseMessage(json)
    }
  }

  // ==================事件绑定=============================

  /**
   * 发送API请求
   * @param method API 端点
   * @param params 请求参数
   */
  send<T extends keyof WSSendParam>(method: T, params: WSSendParam[T]) {
    const echo = nanoid()

    const message: APIRequest<T> = {
      action: method,
      params: params,
      echo
    }

    if (this.#debug) {
      logger.debug('[node-open-napcat] send request')
      logger.dir(message)
    }

    return new Promise<WSSendReturn[T]>((resolve, reject) => {
      const onSuccess = (response: any) => {
        this.#echoMap.delete(echo)
        return resolve(response.data)
      }

      const onFailure = (reason: any) => {
        this.#echoMap.delete(echo)
        return reject(reason)
      }

      this.#echoMap.set(echo, {
        message,
        onSuccess,
        onFailure
      })

      this.#eventBus.emit('api.preSend', message)

      if (this.#socket === undefined) {
        reject({
          status: 'failed',
          retcode: -1,
          data: null,
          message: 'api socket is not connected',
          echo: ''
        })
      } else if (this.#socket.readyState === WebSocket.CLOSING) {
        reject({
          status: 'failed',
          retcode: -1,
          data: null,
          message: 'api socket is closed',
          echo: ''
        })
      } else {
        this.#socket.send(JSON.stringify(message))
      }
    })
  }

  /**
   * 注册监听方法
   * @param event
   * @param handle
   */
  on<T extends keyof AllHandlers>(event: T, handle: EventHandle<T>) {
    this.#eventBus.on(event, handle)
    return this
  }

  /**
   * 只执行一次
   * @param event
   * @param handle
   */
  once<T extends keyof AllHandlers>(event: T, handle: EventHandle<T>) {
    this.#eventBus.once(event, handle)
    return this
  }

  /**
   * 解除监听方法
   * @param event
   * @param handle
   */
  off<T extends keyof AllHandlers>(event: T, handle: EventHandle<T>) {
    this.#eventBus.off(event, handle)
    return this
  }

  /**
   * 手动模拟触发某个事件
   * @param type
   * @param context
   */
  emit<T extends keyof AllHandlers>(type: T, context: AllHandlers[T]) {
    this.#eventBus.emit(type, context)
    return this
  }
}
