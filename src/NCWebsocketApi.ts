import { WSSendParam } from './Interfaces.js'
import { NCWebsocketBase } from './NCWebsocketBase.js'
import { CQCodeEncode } from './Utils.js'

export class NCWebsocketApi extends NCWebsocketBase {
  get_robot_uin_range() {
    return this.send('get_robot_uin_range', {})
  }

  set_online_status(params: WSSendParam['set_online_status']) {
    return this.send('set_online_status', params)
  }

  get_friends_with_category() {
    return this.send('get_friends_with_category', {})
  }

  set_qq_avatar(params: WSSendParam['set_qq_avatar']) {
    return this.send('set_qq_avatar', params)
  }

  get_file(params: WSSendParam['get_file']) {
    return this.send('get_file', params)
  }

  forward_friend_single_msg(params: WSSendParam['forward_friend_single_msg']) {
    return this.send('forward_friend_single_msg', params)
  }

  forward_group_single_msg(params: WSSendParam['forward_group_single_msg']) {
    return this.send('forward_group_single_msg', params)
  }

  translate_en2zh(params: WSSendParam['translate_en2zh']) {
    return this.send('translate_en2zh', params)
  }

  get_group_file_count(params: WSSendParam['get_group_file_count']) {
    return this.send('get_group_file_count', params)
  }

  get_group_file_list(params: WSSendParam['get_group_file_list']) {
    return this.send('get_group_file_list', params)
  }

  set_group_file_folder(params: WSSendParam['set_group_file_folder']) {
    return this.send('set_group_file_folder', params)
  }

  del_group_file(params: WSSendParam['del_group_file']) {
    return this.send('del_group_file', params)
  }

  del_group_file_folder(params: WSSendParam['del_group_file_folder']) {
    return this.send('del_group_file_folder', params)
  }

  send_like(params: WSSendParam['send_like']) {
    return this.send('send_like', params)
  }

  get_login_info() {
    return this.send('get_login_info', {})
  }

  get_friend_list() {
    return this.send('get_friend_list', {})
  }

  get_group_info(params: WSSendParam['get_group_info']) {
    return this.send('get_group_info', params)
  }

  get_group_list() {
    return this.send('get_group_list', {})
  }

  get_group_member_info(params: WSSendParam['get_group_member_info']) {
    return this.send('get_group_member_info', params)
  }

  get_group_member_list(params: WSSendParam['get_group_member_list']) {
    return this.send('get_group_member_list', params)
  }

  get_msg(params: WSSendParam['get_msg']) {
    return this.send('get_msg', params)
  }

  send_msg(params: WSSendParam['send_msg']) {
    if (typeof params.message === 'string') params.message = CQCodeEncode(params.message)
    return this.send('send_msg', params)
  }

  send_group_msg(params: WSSendParam['send_group_msg']) {
    if (typeof params.message === 'string') params.message = CQCodeEncode(params.message)
    return this.send('send_group_msg', params)
  }

  send_private_msg(params: WSSendParam['send_private_msg']) {
    if (typeof params.message === 'string') params.message = CQCodeEncode(params.message)
    return this.send('send_private_msg', params)
  }

  delete_msg(params: WSSendParam['delete_msg']) {
    return this.send('delete_msg', params)
  }

  set_msg_emoji_like(params: WSSendParam['set_msg_emoji_like']) {
    return this.send('set_msg_emoji_like', params)
  }

  set_group_add_request(params: WSSendParam['set_group_add_request']) {
    return this.send('set_group_add_request', params)
  }

  set_friend_add_request(params: WSSendParam['set_friend_add_request']) {
    return this.send('set_friend_add_request', params)
  }

  set_group_leave(params: WSSendParam['set_group_leave']) {
    return this.send('set_group_leave', params)
  }

  get_version_info() {
    return this.send('get_version_info', {})
  }

  get_status() {
    return this.send('get_status', {})
  }

  can_send_record() {
    return this.send('can_send_record', {})
  }

  can_send_image() {
    return this.send('can_send_image', {})
  }

  set_group_kick(params: WSSendParam['set_group_kick']) {
    return this.send('set_group_kick', params)
  }

  set_group_ban(params: WSSendParam['set_group_ban']) {
    return this.send('set_group_ban', params)
  }

  set_group_whole_ban(params: WSSendParam['set_group_whole_ban']) {
    return this.send('set_group_whole_ban', params)
  }

  set_group_admin(params: WSSendParam['set_group_admin']) {
    return this.send('set_group_admin', params)
  }

  set_group_card(params: WSSendParam['set_group_card']) {
    return this.send('set_group_card', params)
  }

  set_group_name(params: WSSendParam['set_group_name']) {
    return this.send('set_group_name', params)
  }

  get_image(params: WSSendParam['get_image']) {
    return this.send('get_image', params)
  }

  get_record(params: WSSendParam['get_record']) {
    return this.send('get_record', params)
  }

  clean_cache() {
    return this.send('clean_cache', {})
  }

  get_cookies(params: WSSendParam['get_cookies']) {
    return this.send('get_cookies', params)
  }

  '.handle_quick_operation' = (params: WSSendParam['.handle_quick_operation']) => {
    if ('reply' in params && typeof params.reply === 'string') {
      params.reply = CQCodeEncode(params.reply)
    }
    return this.send('.handle_quick_operation', params)
  }

  get_group_honor_info(params: WSSendParam['get_group_honor_info']) {
    return this.send('get_group_honor_info', params)
  }

  get_essence_msg_list(params: WSSendParam['get_essence_msg_list']) {
    return this.send('get_essence_msg_list', params)
  }

  _send_group_notice(params: WSSendParam['_send_group_notice']) {
    return this.send('_send_group_notice', params)
  }

  _get_group_notice(params: WSSendParam['_get_group_notice']) {
    return this.send('_get_group_notice', params)
  }

  send_forward_msg(params: WSSendParam['send_forward_msg']) {
    params.message.map((msg) => {
      if ('content' in msg.data && typeof msg.data.content === 'string') {
        msg.data.content = CQCodeEncode(msg.data.content)
      }
    })
    return this.send('send_forward_msg', params)
  }

  send_group_forward_msg(params: WSSendParam['send_group_forward_msg']) {
    params.message.map((msg) => {
      if ('content' in msg.data && typeof msg.data.content === 'string') {
        msg.data.content = CQCodeEncode(msg.data.content)
      }
    })
    return this.send('send_group_forward_msg', params)
  }

  send_private_forward_msg(params: WSSendParam['send_private_forward_msg']) {
    params.message.map((msg) => {
      if ('content' in msg.data && typeof msg.data.content === 'string') {
        msg.data.content = CQCodeEncode(msg.data.content)
      }
    })
    return this.send('send_private_forward_msg', params)
  }

  get_stranger_info(params: WSSendParam['get_stranger_info']) {
    return this.send('get_stranger_info', params)
  }

  mark_msg_as_read(params: WSSendParam['mark_msg_as_read']) {
    return this.send('mark_msg_as_read', params)
  }

  mark_private_msg_as_read(params: WSSendParam['mark_private_msg_as_read']) {
    return this.send('mark_private_msg_as_read', params)
  }

  mark_group_msg_as_read(params: WSSendParam['mark_group_msg_as_read']) {
    return this.send('mark_group_msg_as_read', params)
  }

  upload_group_file(params: WSSendParam['upload_group_file']) {
    return this.send('upload_group_file', params)
  }

  download_file(params: WSSendParam['download_file']) {
    return this.send('download_file', params)
  }

  get_group_msg_history(params: WSSendParam['get_group_msg_history']) {
    return this.send('get_group_msg_history', params)
  }

  get_forward_msg(params: WSSendParam['get_forward_msg']) {
    return this.send('get_forward_msg', params)
  }

  get_friend_msg_history(params: WSSendParam['get_friend_msg_history']) {
    return this.send('get_friend_msg_history', params)
  }

  get_group_system_msg(params: WSSendParam['get_group_system_msg']) {
    return this.send('get_group_system_msg', params)
  }

  get_online_clients(params: WSSendParam['get_online_clients']) {
    return this.send('get_online_clients', params)
  }

  ocr_image(params: WSSendParam['ocr_image']) {
    return this.send('ocr_image', params)
  }

  set_self_profile(params: WSSendParam['set_self_profile']) {
    return this.send('set_self_profile', params)
  }

  create_collections(params: WSSendParam['create_collection']) {
    return this.send('create_collection', params)
  }

  get_collection_list(params: WSSendParam['get_collection_list']) {
    return this.send('get_collection_list', params)
  }

  set_self_longnick(params: WSSendParam['set_self_longnick']) {
    return this.send('set_self_longnick', params)
  }

  set_essence_msg(params: WSSendParam['set_essence_msg']) {
    return this.send('set_essence_msg', params)
  }

  delete_essence_msg(params: WSSendParam['delete_essence_msg']) {
    return this.send('delete_essence_msg', params)
  }

  get_recent_contact(params?: WSSendParam['get_recent_contact']) {
    return this.send('get_recent_contact', params ?? {})
  }

  _mark_all_as_read() {
    return this.send('_mark_all_as_read', {})
  }

  get_profile_like() {
    return this.send('get_profile_like', {})
  }

  set_group_portrait(params: WSSendParam['set_group_portrait']) {
    return this.send('set_group_portrait', params)
  }

  fetch_custom_face() {
    return this.send('fetch_custom_face', {})
  }

  upload_private_file(params: WSSendParam['upload_private_file']) {
    return this.send('upload_private_file', params)
  }

  fetch_emoji_like(params: WSSendParam['fetch_emoji_like']) {
    return this.send('fetch_emoji_like', params)
  }

  set_input_status(params: WSSendParam['set_input_status']) {
    return this.send('set_input_status', params)
  }

  _del_group_notice(params: WSSendParam['_del_group_notice']) {
    return this.send('_del_group_notice', params)
  }
}
