import { EventKey, WSSendParam } from './Interfaces.js'
import { NCWebsocketBase } from './NCWebsocketBase.js'

export class NCWebsocketApi extends NCWebsocketBase {
  /**
   * @napcat
   * 推荐联系人/群聊
   */
  ArkShareGroup(params: WSSendParam['ArkShareGroup']) {
    return this.send('ArkShareGroup', params)
  }

  /**
   * @napcat
   * 推荐群聊
   */
  ArkSharePeer(params: WSSendParam['ArkSharePeer']) {
    return this.send('ArkSharePeer', params)
  }

  /**
   * @napcat
   * 获取机器人QQ号区间
   */
  get_robot_uin_range() {
    return this.send('get_robot_uin_range', {})
  }

  /**
   * @napcat
   * 设置在线状态
   * @param params 包含在线状态信息的参数
   */
  set_online_status(params: WSSendParam['set_online_status']) {
    return this.send('set_online_status', params)
  }

  /**
   * @napcat
   * 获取好友列表及分组信息
   */
  get_friends_with_category() {
    return this.send('get_friends_with_category', {})
  }

  /**
   * @napcat
   * 设置QQ头像
   */
  set_qq_avatar(params: WSSendParam['set_qq_avatar']) {
    return this.send('set_qq_avatar', params)
  }

  /**
   * @napcat
   * 获取文件信息
   */
  get_file(params: WSSendParam['get_file']) {
    return this.send('get_file', params)
  }

  /**
   * @napcat
   * 转发单条信息到私聊
   */
  forward_friend_single_msg(params: WSSendParam['forward_friend_single_msg']) {
    return this.send('forward_friend_single_msg', params)
  }

  /**
   * @napcat
   * 转发单条信息到群聊
   */
  forward_group_single_msg(params: WSSendParam['forward_group_single_msg']) {
    return this.send('forward_group_single_msg', params)
  }

  /**
   * @napcat
   * 英译中翻译
   */
  translate_en2zh(params: WSSendParam['translate_en2zh']) {
    return this.send('translate_en2zh', params)
  }

  /**
   * @napcat
   * 获取群文件数量
   */
  get_group_file_count(params: WSSendParam['get_group_file_count']) {
    return this.send('get_group_file_count', params)
  }

  /**
   * @napcat
   * 获取群文件列表
   */
  get_group_file_list(params: WSSendParam['get_group_file_list']) {
    return this.send('get_group_file_list', params)
  }

  /**
   * @napcat
   * 新建群文件文件夹
   */
  set_group_file_folder(params: WSSendParam['set_group_file_folder']) {
    return this.send('set_group_file_folder', params)
  }

  /**
   * @napcat
   * 删除群文件文件
   */
  del_group_file(params: WSSendParam['del_group_file']) {
    return this.send('del_group_file', params)
  }

  /**
   * @napcat
   * 删除群文件文件夹
   */
  del_group_file_folder(params: WSSendParam['del_group_file_folder']) {
    return this.send('del_group_file_folder', params)
  }

  /**
   * @onebot
   * 发送好友赞
   */
  send_like(params: WSSendParam['send_like']) {
    return this.send('send_like', params)
  }

  /**
   * @onebot
   * 获取登录号信息
   */
  get_login_info() {
    return this.send('get_login_info', {})
  }

  /**
   * @onebot
   * 获取好友列表
   */
  get_friend_list() {
    return this.send('get_friend_list', {})
  }

  /**
   * @onebot
   * 获取群信息
   */
  get_group_info(params: WSSendParam['get_group_info']) {
    return this.send('get_group_info', params)
  }

  /**
   * @onebot
   * 获取群列表
   */
  get_group_list() {
    return this.send('get_group_list', {})
  }

  /**
   * @onebot
   * 获取群成员信息
   */
  get_group_member_info(params: WSSendParam['get_group_member_info']) {
    return this.send('get_group_member_info', params)
  }

  /**
   * @onebot
   * 获取群成员列表
   */
  get_group_member_list(params: WSSendParam['get_group_member_list']) {
    return this.send('get_group_member_list', params)
  }

  /**
   * @onebot
   * 获取消息
   */
  get_msg(params: WSSendParam['get_msg']) {
    return this.send('get_msg', params)
  }

  /**
   * @onebot
   * 发送消息
   */
  send_msg(params: WSSendParam['send_msg']) {
    return this.send('send_msg', params)
  }

  /**
   * @onebot
   * 发送群消息
   */
  send_group_msg(params: WSSendParam['send_group_msg']) {
    return this.send('send_group_msg', params)
  }

  /**
   * @onebot
   * 发送私聊消息
   * @desc 不支持主动临时消息
   */
  send_private_msg(params: WSSendParam['send_private_msg']) {
    return this.send('send_private_msg', params)
  }

  /**
   * @onebot
   * 撤回消息
   */
  delete_msg(params: WSSendParam['delete_msg']) {
    return this.send('delete_msg', params)
  }

  /**
   * @napcat
   * 设置消息的表情回复
   */
  set_msg_emoji_like(params: WSSendParam['set_msg_emoji_like']) {
    return this.send('set_msg_emoji_like', params)
  }

  /**
   * @onebot
   * 处理加群请求／邀请
   */
  set_group_add_request(params: WSSendParam['set_group_add_request']) {
    return this.send('set_group_add_request', params)
  }

  /**
   * @onebot
   * 处理加好友请求
   */
  set_friend_add_request(params: WSSendParam['set_friend_add_request']) {
    return this.send('set_friend_add_request', params)
  }

  /**
   * @onebot
   * 退出群组
   */
  set_group_leave(params: WSSendParam['set_group_leave']) {
    return this.send('set_group_leave', params)
  }

  /**
   * @onebot
   * 获取版本信息
   */
  get_version_info() {
    return this.send('get_version_info', {})
  }

  /**
   * @onebot
   * 获取状态
   */
  get_status() {
    return this.send('get_status', {})
  }

  /**
   * @onebot
   * 检查是否可以发送语音
   */
  can_send_record() {
    return this.send('can_send_record', {})
  }

  /**
   * @onebot
   * 检查是否可以发送图片
   */
  can_send_image() {
    return this.send('can_send_image', {})
  }

  /**
   * @onebot
   * 群组踢人
   */
  set_group_kick(params: WSSendParam['set_group_kick']) {
    return this.send('set_group_kick', params)
  }

  /**
   * @onebot
   * 群组单人禁言
   */
  set_group_ban(params: WSSendParam['set_group_ban']) {
    return this.send('set_group_ban', params)
  }

  /**
   * @onebot
   * 群组全员禁言
   */
  set_group_whole_ban(params: WSSendParam['set_group_whole_ban']) {
    return this.send('set_group_whole_ban', params)
  }

  /**
   * @onebot
   * 设置群管理员
   */
  set_group_admin(params: WSSendParam['set_group_admin']) {
    return this.send('set_group_admin', params)
  }

  /**
   * @onebot
   * 设置群名片（群备注）
   */
  set_group_card(params: WSSendParam['set_group_card']) {
    return this.send('set_group_card', params)
  }

  /**
   * @onebot
   * 设置群名
   */
  set_group_name(params: WSSendParam['set_group_name']) {
    return this.send('set_group_name', params)
  }

  /**
   * @onebot
   * 获取图片信息
   */
  get_image(params: WSSendParam['get_image']) {
    return this.send('get_image', params)
  }

  /**
   * @onebot
   * 获取语音
   */
  get_record(params: WSSendParam['get_record']) {
    return this.send('get_record', params)
  }

  /**
   * @onebot
   * 获取Cookies
   */
  get_cookies(params: WSSendParam['get_cookies']) {
    return this.send('get_cookies', params)
  }

  /**
   * @go-cqhttp
   * 对事件执行快速操作 (隐藏 API)
   */
  '.handle_quick_operation' = (params: WSSendParam['.handle_quick_operation']) => {
    return this.send('.handle_quick_operation', params)
  }

  /**
   * @onebot
   * 获取群荣誉信息
   */
  get_group_honor_info(params: WSSendParam['get_group_honor_info']) {
    return this.send('get_group_honor_info', params)
  }

  /**
   * @go-cqhttp
   * 获取精华消息列表
   */
  get_essence_msg_list(params: WSSendParam['get_essence_msg_list']) {
    return this.send('get_essence_msg_list', params)
  }

  /**
   * @go-cqhttp
   * 发送群公告
   */
  _send_group_notice(params: WSSendParam['_send_group_notice']) {
    return this.send('_send_group_notice', params)
  }

  /**
   * @go-cqhttp
   * 获取群公告
   */
  _get_group_notice(params: WSSendParam['_get_group_notice']) {
    return this.send('_get_group_notice', params)
  }

  /**
   * @napcat
   * 发送合并转发消息
   */
  send_forward_msg(params: WSSendParam['send_forward_msg']) {
    return this.send('send_forward_msg', params)
  }

  /**
   * @go-cqhttp
   * 发送群合并转发消息
   */
  send_group_forward_msg(params: WSSendParam['send_group_forward_msg']) {
    return this.send('send_group_forward_msg', params)
  }

  /**
   * @go-cqhttp
   * 发送私聊合并转发消息
   */
  send_private_forward_msg(params: WSSendParam['send_private_forward_msg']) {
    return this.send('send_private_forward_msg', params)
  }

  /**
   * @onebot
   * 获取陌生人信息
   */
  get_stranger_info(params: WSSendParam['get_stranger_info']) {
    return this.send('get_stranger_info', params)
  }

  /**
   * @go-cqhttp
   * 标记消息已读
   */
  mark_msg_as_read(params: WSSendParam['mark_msg_as_read']) {
    return this.send('mark_msg_as_read', params)
  }

  /**
   * @napcat
   * 标记私聊消息已读
   */
  mark_private_msg_as_read(params: WSSendParam['mark_private_msg_as_read']) {
    return this.send('mark_private_msg_as_read', params)
  }

  /**
   * @napcat
   * 标记群消息已读
   */
  mark_group_msg_as_read(params: WSSendParam['mark_group_msg_as_read']) {
    return this.send('mark_group_msg_as_read', params)
  }

  /**
   * @go-cqhttp
   * 上传群文件
   */
  upload_group_file(params: WSSendParam['upload_group_file']) {
    return this.send('upload_group_file', params)
  }

  /**
   * @go-cqhttp
   * 删除群文件
   */
  delete_group_file(params: WSSendParam['delete_group_file']) {
    return this.send('delete_group_file', params)
  }

  /**
   * @go-cqhttp
   * 创建群文件文件夹
   */
  create_group_file_folder(params: WSSendParam['create_group_file_folder']) {
    return this.send('create_group_file_folder', params)
  }

  /**
   * @go-cqhttp
   * 删除群文件文件夹
   */
  delete_group_file_folder(params: WSSendParam['delete_group_file_folder']) {
    return this.send('delete_group_file_folder', params)
  }

  /**
   * @go-cqhttp
   * 获取群文件系统信息
   */
  get_group_file_system_info(params: WSSendParam['get_group_file_system_info']) {
    return this.send('get_group_file_system_info', params)
  }

  /**
   * @go-cqhttp
   * 获取群根目录文件列表
   */
  get_group_root_files(params: WSSendParam['get_group_root_files']) {
    return this.send('get_group_root_files', params)
  }

  /**
   * @go-cqhttp
   * 获取群子目录文件列表
   */
  get_group_files_by_folder(params: WSSendParam['get_group_files_by_folder']) {
    return this.send('get_group_files_by_folder', params)
  }

  /**
   * @go-cqhttp
   * 下载文件到缓存目录
   */
  download_file(params: WSSendParam['download_file']) {
    return this.send('download_file', params)
  }

  /**
   * @go-cqhttp
   * 获取群消息历史记录
   */
  get_group_msg_history(params: WSSendParam['get_group_msg_history']) {
    return this.send('get_group_msg_history', params)
  }

  /**
   * @onebot
   * 获取合并转发消息
   */
  get_forward_msg(params: WSSendParam['get_forward_msg']) {
    return this.send('get_forward_msg', params)
  }

  /**
   * @napcat
   * 获取好友消息历史记录
   */
  get_friend_msg_history(params: WSSendParam['get_friend_msg_history']) {
    return this.send('get_friend_msg_history', params)
  }

  /**
   * @napcat
   * 获取群忽略通知列表
   */
  get_group_ignored_notifies(params: WSSendParam['get_group_ignored_notifies']) {
    return this.send('get_group_ignored_notifies', params)
  }

  /**
   * @go-cqhttp
   * 图片 OCR
   */
  ocr_image(params: WSSendParam['ocr_image']) {
    return this.send('ocr_image', params)
  }

  /**
   * @napcat
   * 设置个人资料
   */
  set_self_profile(params: WSSendParam['set_self_profile']) {
    return this.send('set_self_profile', params)
  }

  /**
   * @napcat
   * 创建文本收藏
   */
  create_collection(params: WSSendParam['create_collection']) {
    return this.send('create_collection', params)
  }

  /**
   * @napcat
   * 获取收藏列表
   */
  get_collection_list(params: WSSendParam['get_collection_list']) {
    return this.send('get_collection_list', params)
  }

  /**
   * @napcat
   * 设置个人签名
   */
  set_self_longnick(params: WSSendParam['set_self_longnick']) {
    return this.send('set_self_longnick', params)
  }

  /**
   * @go-cqhttp
   * 设置精华消息
   */
  set_essence_msg(params: WSSendParam['set_essence_msg']) {
    return this.send('set_essence_msg', params)
  }

  /**
   * @go-cqhttp
   * 删除精华消息
   */
  delete_essence_msg(params: WSSendParam['delete_essence_msg']) {
    return this.send('delete_essence_msg', params)
  }

  /**
   * @napcat
   * 获取最近联系人列表
   */
  get_recent_contact(params?: WSSendParam['get_recent_contact']) {
    return this.send('get_recent_contact', params ?? {})
  }

  /**
   * @napcat
   * 标记所有消息已读
   */
  _mark_all_as_read() {
    return this.send('_mark_all_as_read', {})
  }

  /**
   * @napcat
   * 获取自身点赞列表
   */
  get_profile_like() {
    return this.send('get_profile_like', {})
  }

  /**
   * @napcat
   * 设置群头像
   */
  set_group_portrait(params: WSSendParam['set_group_portrait']) {
    return this.send('set_group_portrait', params)
  }

  /**
   * @napcat
   * 获取自定义表情列表
   */
  fetch_custom_face() {
    return this.send('fetch_custom_face', {})
  }

  /**
   * @go-cqhttp
   * 上传私聊文件
   * @param params 包含文件信息的参数
   */
  upload_private_file(params: WSSendParam['upload_private_file']) {
    return this.send('upload_private_file', params)
  }

  /**
   * @napcat
   * 拉取表情回应列表
   */
  fetch_emoji_like(params: WSSendParam['fetch_emoji_like']) {
    return this.send('fetch_emoji_like', params)
  }

  /**
   * @napcat
   * 设置输入状态
   */
  set_input_status(params: WSSendParam['set_input_status']) {
    return this.send('set_input_status', params)
  }

  /**
   * @go-cqhttp
   * 删除群公告
   */
  _del_group_notice(params: WSSendParam['_del_group_notice']) {
    return this.send('_del_group_notice', params)
  }

  /**
   * @napcat
   * 获取群详细信息
   */
  get_group_info_ex(params: WSSendParam['get_group_info_ex']) {
    return this.send('get_group_info_ex', params)
  }

  /**
   * @go-cqhttp
   * 获取群系统消息
   */
  get_group_system_msg(params: WSSendParam['get_group_system_msg']) {
    return this.send('get_group_system_msg', params)
  }
}
