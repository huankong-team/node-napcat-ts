import {
  type AllHandlers,
  type EventHandle,
  type MessageHandler,
  type MessageSentHandler,
  type MetaEventHandler,
  type NoticeHandler,
  type RequestHandler,
  type WSReceiveHandler
} from './Interfaces.js'

import mitt from 'mitt'
import { logger } from './Utils.js'

export class NCEventBus {
  debug: boolean
  // @ts-ignore
  #mitt = mitt()

  constructor(debug = false) {
    this.debug = debug
  }

  on<T extends keyof AllHandlers>(event: T, handle: EventHandle<T>) {
    this.#mitt.on(event, handle)
    return this
  }

  once<T extends keyof AllHandlers>(event: T, handle: EventHandle<T>) {
    const fn = (args: AllHandlers[T]) => {
      this.#mitt.off(event, fn)
      handle(args)
    }
    this.#mitt.on(event, fn)
    return this
  }

  off<T extends keyof AllHandlers>(event: T, handle: EventHandle<T>) {
    this.#mitt.off(event, handle)
    return this
  }

  emit<T extends keyof AllHandlers>(type: T, context: AllHandlers[T]): this {
    this.#mitt.emit(type, context)

    // 触发总类
    const indexOf = type.lastIndexOf('.')
    if (indexOf > 0) return this.emit(type.slice(0, indexOf) as T, context)

    return this
  }

  post_types = ['message', 'notice', 'request', 'meta_event', 'message_sent']

  parseMessage(json: WSReceiveHandler[keyof WSReceiveHandler]) {
    const post_type = json['post_type']

    switch (post_type) {
      case 'message':
        this.message(json)
        break
      case 'message_sent':
        this.message_sent(json)
        break
      case 'notice':
        this.notice(json)
        break
      case 'request':
        this.request(json)
        break
      case 'meta_event':
        this.meta_event(json)
        break
      default:
        logger.warn('[node-napcat-ts]', '[eventBus]', `unknown post_type: ${post_type}`)
        return false
    }

    return true
  }

  message(json: MessageHandler[keyof MessageHandler]) {
    const messageType = json['message_type']
    switch (messageType) {
      case 'private':
        return this.emit('message.private', json)
      case 'group':
        return this.emit('message.group', json)
      default:
        if (this.debug) {
          logger.warn('[node-napcat-ts]', '[eventBus]', `unknown message_type: ${messageType}`)
        }
        return false
    }
  }

  message_sent(json: MessageSentHandler[keyof MessageSentHandler]) {
    const message_type = json['message_type']
    switch (message_type) {
      case 'private':
        return this.emit('message_sent.private', json)
      case 'group':
        return this.emit('message_sent.group', json)
      default:
        if (this.debug) {
          logger.warn(
            '[node-napcat-ts]',
            '[eventBus]',
            `unknown message_sent_type: ${message_type}`
          )
        }
        return false
    }
  }

  notice(json: NoticeHandler[keyof NoticeHandler]) {
    const notice_type = json['notice_type']
    switch (notice_type) {
      case 'group_upload':
        return this.emit('notice.group_upload', json)
      case 'group_admin':
        return this.emit('notice.group_admin', json)
      case 'group_decrease':
        return this.emit('notice.group_decrease', json)
      case 'group_increase':
        return this.emit('notice.group_increase', json)
      case 'group_ban':
        return this.emit('notice.group_ban', json)
      case 'friend_add':
        return this.emit('notice.friend_add', json)
      case 'group_recall':
        return this.emit('notice.group_recall', json)
      case 'friend_recall':
        return this.emit('notice.friend_recall', json)
      case 'notify':
        const sub_type = json['sub_type']
        switch (sub_type) {
          case 'poke':
            return this.emit(
              'group_id' in json ? 'notice.notify.poke.group' : 'notice.notify.poke.friend',
              json
            )
          case 'input_status':
            return this.emit(
              json.group_id !== 0
                ? 'notice.notify.input_status.group'
                : 'notice.notify.input_status.friend',
              json
            )
          default:
            if (this.debug) {
              logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notify_type: ${sub_type}`)
            }
            return false
        }
      case 'essence':
        return this.emit('notice.essence', json)
      case 'group_msg_emoji_like':
        return this.emit('notice.group_msg_emoji_like', json)
      default:
        if (this.debug) {
          logger.warn('[node-napcat-ts]', '[eventBus]', `unknown notice_type: ${notice_type}`)
        }
        return false
    }
  }

  request(json: RequestHandler[keyof RequestHandler]) {
    const request_type = json['request_type']
    switch (request_type) {
      case 'friend':
        return this.emit('request.friend', json)
      case 'group':
        return this.emit('request.group', json)
      default:
        if (this.debug) {
          logger.warn('[node-napcat-ts]', '[eventBus]', `unknown request_type: ${request_type}`)
        }
        return false
    }
  }

  meta_event(json: MetaEventHandler[keyof MetaEventHandler]) {
    const meta_event_type = json['meta_event_type']

    switch (meta_event_type) {
      case 'lifecycle':
        return this.emit('meta_event.lifecycle', json)
      case 'heartbeat':
        return this.emit('meta_event.heartbeat', json)
      default:
        if (this.debug) {
          logger.warn(
            '[node-napcat-ts]',
            '[eventBus]',
            `unknown meta_event_type: ${meta_event_type}`
          )
        }
        return false
    }
  }
}
