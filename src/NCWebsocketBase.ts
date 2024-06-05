import { randomUUID } from 'crypto'
import WebSocket, { type RawData } from 'ws'
import type {
  APIRequest,
  AllHandlers,
  EventHandle,
  NCWebsocketOptions,
  ResponseHandler,
  WSErrorRes,
  WSSendParam,
  WSSendReturn
} from './Interfaces.js'
import { NCEventBus } from './NCEventBus.js'
import { logger } from './Utils.js'

export class NCWebsocketBase {
  #debug: boolean

  #baseUrl: string
  #accessToken: string
  #eventSocket?: WebSocket
  #apiSocket?: WebSocket

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

    this.#debug = debug
    this.#eventBus = new NCEventBus(this.#debug)
    this.#echoMap = new Map()
  }

  // ==================WebSocket操作=============================

  connect() {
    this.connectEvent()
    this.connectApi()
  }

  disconnect() {
    this.disconnectEvent()
    this.disconnectApi()
  }

  reconnect() {
    this.disconnect()
    this.connect()
  }

  connectEvent() {
    this.#eventBus.emit('socket.eventConnecting', undefined)
    this.#eventSocket = new WebSocket(`${this.#baseUrl}/event?access_token=${this.#accessToken}`)
      .on('open', () => this.#eventBus.emit('socket.eventOpen', undefined))
      .on('close', (code, reason) => {
        this.#eventBus.emit('socket.eventClose', {
          code,
          reason: reason.toString()
        })
        this.#eventSocket = undefined
      })
      .on('message', (data) => this.#eventMessage(data))
      .on('error', (data: WSErrorRes) => this.#eventBus.emit('socket.eventError', data))
  }

  connectApi() {
    this.#eventBus.emit('socket.apiConnecting', undefined)
    this.#apiSocket = new WebSocket(`${this.#baseUrl}/api?access_token=${this.#accessToken}`)
      .on('open', () => {
        this.#eventBus.emit('socket.apiOpen', undefined)
      })
      .on('close', (code, reason) => {
        this.#eventBus.emit('socket.apiClose', {
          code,
          reason: reason.toString()
        })
        this.#apiSocket = undefined
      })
      .on('message', (data) => this.#apiMessage(data))
      .on('error', (data: WSErrorRes) => this.#eventBus.emit('socket.apiError', data))
  }

  disconnectEvent() {
    if (this.#eventSocket !== undefined) {
      this.#eventSocket.close(1000)
      this.#eventSocket = undefined
    }
  }

  disconnectApi() {
    if (this.#apiSocket !== undefined) {
      this.#apiSocket.close(1000)
      this.#apiSocket = undefined
    }
  }

  #eventMessage(data: RawData) {
    let json
    try {
      json = JSON.parse(data.toString())
    } catch (error) {
      logger.warn('[node-napcat-ts]', '[event]', 'failed to parse JSON')
      logger.dir(error)
      return
    }

    if (this.#debug) {
      logger.debug('[node-napcat-ts]', '[event]', 'receive data')
      logger.dir(json)
    }

    this.#eventBus.parseMessage(json)
  }

  #apiMessage(data: RawData) {
    let json
    try {
      json = JSON.parse(data.toString())
    } catch (error) {
      logger.warn('[node-napcat-ts]', '[api]', 'failed to parse JSON')
      logger.dir(error)
      return
    }

    if (this.#debug) {
      logger.debug('[node-napcat-ts]', '[api]', 'receive data')
      logger.dir(json)
    }

    const handler = this.#echoMap.get(json.echo)

    if (handler) {
      if (json.retcode === 0) {
        handler.onSuccess(json)
      } else {
        handler.onFailure(json)
      }
    }

    this.#eventBus.emit('api.response', json)
  }

  // ==================事件绑定=============================

  /**
   * 发送API请求
   * @param method API 端点
   * @param params 请求参数
   */
  send<T extends keyof WSSendParam>(method: T, params: WSSendParam[T]): Promise<WSSendReturn[T]> {
    const echo = randomUUID({ disableEntropyCache: true })

    const message: APIRequest<T> = {
      action: method,
      params: params,
      echo
    }

    if (this.#debug) {
      logger.debug('[node-open-shamrock] send request')
      logger.dir(message)
    }

    return new Promise((resolve, reject) => {
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

      if (this.#apiSocket === undefined) {
        reject({
          status: 'failed',
          retcode: -1,
          data: null,
          message: 'api socket is not connected',
          echo: ''
        })
      } else if (this.#apiSocket.readyState === WebSocket.CLOSING) {
        reject({
          status: 'failed',
          retcode: -1,
          data: null,
          message: 'api socket is closed',
          echo: ''
        })
      } else {
        this.#apiSocket.send(JSON.stringify(message))
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

  // ==================Api操作=============================
}
