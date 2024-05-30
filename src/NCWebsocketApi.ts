import type { WSSendParam } from './Interfaces.ts'
import { NCWebsocketBase } from './NCWebsocketBase.ts'

export class NCWebsocketApi extends NCWebsocketBase {
  get_login_info(params: WSSendParam['get_login_info']) {
    return this.send('get_login_info', params)
  }

  get_stranger_info(params: WSSendParam['get_stranger_info']) {
    return this.send('get_stranger_info', params)
  }

  get_friend_list(params: WSSendParam['get_friend_list']) {
    return this.send('get_friend_list', params)
  }

  send_private_msg(params: WSSendParam['send_private_msg']) {
    return this.send('send_private_msg', params)
  }

  send_group_msg(params: WSSendParam['send_group_msg']) {
    return this.send('send_group_msg', params)
  }

  send_msg(params: WSSendParam['send_msg']) {
    return this.send('send_msg', params)
  }

  get_msg(params: WSSendParam['get_msg']) {
    return this.send('get_msg', params)
  }

  delete_msg(params: WSSendParam['delete_msg']) {
    return this.send('delete_msg', params)
  }

  mark_msg_as_read(params: WSSendParam['mark_msg_as_read']) {
    return this.send('mark_msg_as_read', params)
  }

  get_forward_msg(params: WSSendParam['get_forward_msg']) {
    return this.send('get_forward_msg', params)
  }

  send_group_forward_msg(params: WSSendParam['send_group_forward_msg']) {
    return this.send('send_group_forward_msg', params)
  }

  send_private_forward_msg(params: WSSendParam['send_private_forward_msg']) {
    return this.send('send_private_forward_msg', params)
  }

  send_forward_msg(params: WSSendParam['send_forward_msg']) {
    return this.send('send_forward_msg', params)
  }

  get_group_msg_history(params: WSSendParam['get_group_msg_history']) {
    return this.send('get_group_msg_history', params)
  }

  get_image(params: WSSendParam['get_image']) {
    return this.send('get_image', params)
  }

  can_send_image(params: WSSendParam['can_send_image']) {
    return this.send('can_send_image', params)
  }

  ocr_image(params: WSSendParam['ocr_image']) {
    return this.send('ocr_image', params)
  }

  get_record(params: WSSendParam['get_record']) {
    return this.send('get_record', params)
  }

  can_send_record(params: WSSendParam['can_send_record']) {
    return this.send('can_send_record', params)
  }

  set_friend_add_request(params: WSSendParam['set_friend_add_request']) {
    return this.send('set_friend_add_request', params)
  }

  set_group_add_request(params: WSSendParam['set_group_add_request']) {
    return this.send('set_group_add_request', params)
  }

  get_group_info(params: WSSendParam['get_group_info']) {
    return this.send('get_group_info', params)
  }

  get_group_list(params: WSSendParam['get_group_list']) {
    return this.send('get_group_list', params)
  }

  get_group_member_info(params: WSSendParam['get_group_member_info']) {
    return this.send('get_group_member_info', params)
  }

  get_group_member_list(params: WSSendParam['get_group_member_list']) {
    return this.send('get_group_member_list', params)
  }

  get_group_honor_info(params: WSSendParam['get_group_honor_info']) {
    return this.send('get_group_honor_info', params)
  }

  get_group_system_msg(params: WSSendParam['get_group_system_msg']) {
    return this.send('get_group_system_msg', params)
  }

  get_essence_msg_list(params: WSSendParam['get_essence_msg_list']) {
    return this.send('get_essence_msg_list', params)
  }

  set_group_name(params: WSSendParam['set_group_name']) {
    return this.send('set_group_name', params)
  }

  set_group_admin(params: WSSendParam['set_group_admin']) {
    return this.send('set_group_admin', params)
  }

  set_group_ban(params: WSSendParam['set_group_ban']) {
    return this.send('set_group_ban', params)
  }

  set_group_whole_ban(params: WSSendParam['set_group_whole_ban']) {
    return this.send('set_group_whole_ban', params)
  }

  _send_group_notice(params: WSSendParam['_send_group_notice']) {
    return this.send('_send_group_notice', params)
  }

  _get_group_notice(params: WSSendParam['_get_group_notice']) {
    return this.send('_get_group_notice', params)
  }

  set_group_kick(params: WSSendParam['set_group_kick']) {
    return this.send('set_group_kick', params)
  }

  set_group_leave(params: WSSendParam['set_group_leave']) {
    return this.send('set_group_leave', params)
  }

  upload_group_file(params: WSSendParam['upload_group_file']) {
    return this.send('upload_group_file', params)
  }

  get_version_info(params: WSSendParam['get_version_info']) {
    return this.send('get_version_info', params)
  }

  get_status(params: WSSendParam['get_status']) {
    return this.send('get_status', params)
  }

  download_file(params: WSSendParam['download_file']) {
    return this.send('download_file', params)
  }
}
