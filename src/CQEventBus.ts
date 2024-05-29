import type {
  AllHandlers,
  MessageHandler,
  MessageSentHandler,
  MetaEventHandler,
  NoticeHandler,
  RequestHandler,
  WSReceiveHandler
} from './Interfaces.js'

import { EventEmitter } from 'events'
import { logger } from './Utils.js'

export class CQEventBus extends EventEmitter {
  _events: { [key in keyof AllHandlers]?: Function[] | Function }
  debug: boolean

  constructor(debug = false) {
    super({ captureRejections: true })

    this.debug = debug
    this._events = {}
    this.setMaxListeners(0)
  }

  emit<T extends keyof AllHandlers>(type: T, context: AllHandlers[T]): boolean {
    const handlers = this._events[type]

    // 已注册
    if (handlers) {
      if (typeof handlers === 'function') {
        // 单个
        handlers(context)
      } else {
        // 多个
        for (let i = 0; i < handlers.length; i++) {
          handlers[i](context)
        }
      }
    }

    // 触发总类
    const indexOf = type.lastIndexOf('.')
    if (indexOf > 0) return this.emit(type.slice(0, indexOf) as T, context)

    return true
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
        logger.warn('[node-go-cqhttp-ts]', '[eventBus]', `unknown post_type: ${post_type}`)
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
          logger.warn('[node-go-cqhttp-ts]', '[eventBus]', `unknown message_type: ${messageType}`)
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
            '[node-go-cqhttp-ts]',
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
          case 'lucky_king':
            return this.emit('notice.notify.lucky_king', json)
          case 'honor':
            return this.emit('notice.notify.honor', json)
          default:
            if (this.debug) {
              logger.warn('[node-go-cqhttp-ts]', '[eventBus]', `unknown notify_type: ${sub_type}`)
            }
            return false
        }
      case 'group_card':
        return this.emit('notice.group_card', json)
      case 'offline_file':
        return this.emit('notice.offline_file', json)
      case 'client_status':
        return this.emit('notice.client_status', json)
      case 'essence':
        return this.emit('notice.essence', json)
      default:
        if (this.debug) {
          logger.warn('[node-go-cqhttp-ts]', '[eventBus]', `unknown notice_type: ${notice_type}`)
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
          logger.warn('[node-go-cqhttp-ts]', '[eventBus]', `unknown request_type: ${request_type}`)
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
            '[node-go-cqhttp-ts]',
            '[eventBus]',
            `unknown meta_event_type: ${meta_event_type}`
          )
        }
        return false
    }
  }
}
