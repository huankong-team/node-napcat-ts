import { WSSendParam } from './Interfaces.js'
import { NCWebsocketBase } from './NCWebsocketBase.js'

export class NCWebsocketApi extends NCWebsocketBase {
  reboot_normal(params: WSSendParam['reboot_normal']) {
    return this.send('reboot_normal', params)
  }

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

  debug(params: WSSendParam['debug']) {
    return this.send('debug', params)
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

  reboot(params: WSSendParam['reboot']) {
    return this.send('reboot', params)
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
    return this.send('send_msg', params)
  }

  send_group_msg(params: WSSendParam['send_group_msg']) {
    return this.send('send_group_msg', params)
  }

  send_private_msg(params: WSSendParam['send_private_msg']) {
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
    return this.send('send_forward_msg', params)
  }

  send_group_forward_msg(params: WSSendParam['send_group_forward_msg']) {
    return this.send('send_group_forward_msg', params)
  }

  send_private_forward_msg(params: WSSendParam['send_private_forward_msg']) {
    return this.send('send_private_forward_msg', params)
  }

  get_stranger_info(params: WSSendParam['get_stranger_info']) {
    return this.send('get_stranger_info', params)
  }

  mark_msg_as_read(params: WSSendParam['mark_msg_as_read']) {
    return this.send('mark_msg_as_read', params)
  }

  get_guild_list() {
    return this.send('get_guild_list', {})
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
}
