import type { WSSendParam } from './Interfaces.js'
import { NCWebsocketBase } from './NCWebsocketBase.js'

export class NCWebsocketApi extends NCWebsocketBase {
  /**
   * @ontbot11
   * 发送私聊信息
   */
  async send_private_msg(params: WSSendParam['send_private_msg']) {
    return await this.send('send_private_msg', params)
  }

  /**
   * @onebot11
   * 发送群聊信息
   */
  async send_group_msg(params: WSSendParam['send_group_msg']) {
    return await this.send('send_group_msg', params)
  }

  /**
   * @onebot11
   * 发送信息
   */
  async send_msg(params: WSSendParam['send_msg']) {
    return await this.send('send_msg', params)
  }

  /**
   * @onebot11
   * 撤回消息
   */
  async delete_msg(params: WSSendParam['delete_msg']) {
    return await this.send('delete_msg', params)
  }

  /**
   * @onebot11
   * 获取信息
   */
  async get_msg(params: WSSendParam['get_msg']) {
    return await this.send('get_msg', params)
  }

  /**
   * @onebot11
   * 获取合并信息
   */
  async get_forward_msg(params: WSSendParam['get_forward_msg']) {
    return await this.send('get_forward_msg', params)
  }

  /**
   * @onebot11
   * 点赞
   */
  async send_like(params: WSSendParam['send_like']) {
    return await this.send('send_like', params)
  }

  /**
   * @onebot11
   * 踢出群聊
   */
  async set_group_kick(params: WSSendParam['set_group_kick']) {
    return await this.send('set_group_kick', params)
  }

  /**
   * @onebot11
   * 群聊禁言
   */
  async set_group_ban(params: WSSendParam['set_group_ban']) {
    return await this.send('set_group_ban', params)
  }

  /**
   * @onebot11
   * 群聊匿名禁言
   */
  // async set_group_anonymous_ban(params: WSSendParam['set_group_anonymous_ban']) {
  //   return await this.send('set_group_anonymous_ban', params)
  // }

  /**
   * @onebot11
   * 群聊全员禁言
   */
  async set_group_whole_ban(params: WSSendParam['set_group_whole_ban']) {
    return await this.send('set_group_whole_ban', params)
  }

  /**
   * @onebot11
   * 设置群管理员
   */
  async set_group_admin(params: WSSendParam['set_group_admin']) {
    return await this.send('set_group_admin', params)
  }

  /**
   * @onebot11
   * 设置群匿名
   */
  // async set_group_anonymous(params: WSSendParam['set_group_anonymous']) {
  //   return await this.send('set_group_anonymous', params)
  // }

  /**
   * @onebot11
   * 设置群名片
   */
  async set_group_card(params: WSSendParam['set_group_card']) {
    return await this.send('set_group_card', params)
  }

  /**
   * @onebot11
   * 设置群名
   */
  async set_group_name(params: WSSendParam['set_group_name']) {
    return await this.send('set_group_name', params)
  }

  /**
   * @onebot11
   * 退出群聊
   */
  async set_group_leave(params: WSSendParam['set_group_leave']) {
    return await this.send('set_group_leave', params)
  }

  /**
   * @onebot11
   * 设置群聊专属头衔
   */
  async set_group_special_title(params: WSSendParam['set_group_special_title']) {
    return await this.send('set_group_special_title', params)
  }

  /**
   * @onebot11
   * 处理好友添加请求
   */
  async set_friend_add_request(params: WSSendParam['set_friend_add_request']) {
    return await this.send('set_friend_add_request', params)
  }

  /**
   * @onebot11
   * 处理群聊添加请求
   */
  async set_group_add_request(params: WSSendParam['set_group_add_request']) {
    return await this.send('set_group_add_request', params)
  }

  /**
   * @onebot11
   * 获取登录号信息
   */
  async get_login_info(params: WSSendParam['get_login_info']) {
    return await this.send('get_login_info', params)
  }

  /**
   * @onebot11
   * 获取陌生人的信息
   */
  async get_stranger_info(params: WSSendParam['get_stranger_info']) {
    return await this.send('get_stranger_info', params)
  }

  /**
   * @onebot11
   * 获取好友列表
   */
  async get_friend_list(params: WSSendParam['get_friend_list']) {
    return await this.send('get_friend_list', params)
  }

  /**
   * @onebot11
   * 获取群信息
   */
  async get_group_info(params: WSSendParam['get_group_info']) {
    return await this.send('get_group_info', params)
  }

  /**
   * @onebot11
   * 获取群列表
   */
  async get_group_list(params: WSSendParam['get_group_list']) {
    return await this.send('get_group_list', params)
  }

  /**
   * @onebot11
   * 获取群成员信息
   */
  async get_group_member_info(params: WSSendParam['get_group_member_info']) {
    return await this.send('get_group_member_info', params)
  }

  /**
   * @onebot11
   * 获取群成员列表
   */
  async get_group_member_list(params: WSSendParam['get_group_member_list']) {
    return await this.send('get_group_member_list', params)
  }

  /**
   * @onebot11
   * 获取群荣誉
   */
  async get_group_honor_info(params: WSSendParam['get_group_honor_info']) {
    return await this.send('get_group_honor_info', params)
  }

  /**
   * @onebot11
   * 获取Cookies
   */
  async get_cookies(params: WSSendParam['get_cookies']) {
    return await this.send('get_cookies', params)
  }

  /**
   * @onebot11
   * 获取CsrfToken
   */
  async get_csrf_token(params: WSSendParam['get_csrf_token']) {
    return await this.send('get_csrf_token', params)
  }

  /**
   * @onebot11
   * 获取Credentials
   */
  async get_credentials(params: WSSendParam['get_credentials']) {
    return await this.send('get_credentials', params)
  }

  /**
   * @onebot11
   * 获取语音
   */
  async get_record(params: WSSendParam['get_record']) {
    return await this.send('get_record', params)
  }

  /**
   * @onebot11
   * 获取图片
   */
  async get_image(params: WSSendParam['get_image']) {
    return await this.send('get_image', params)
  }

  /**
   * @onebot11
   * 能否发图片
   */
  async can_send_image(params: WSSendParam['can_send_image']) {
    return await this.send('can_send_image', params)
  }

  /**
   * @onebot11
   * 能否发语音
   */
  async can_send_record(params: WSSendParam['can_send_record']) {
    return await this.send('can_send_record', params)
  }

  /**
   * @onebot11
   * 获取状态
   */
  async get_status(params: WSSendParam['get_status']) {
    return await this.send('get_status', params)
  }

  /**
   * @onebot11
   * 获取版本信息
   */
  async get_version_info(params: WSSendParam['get_version_info']) {
    return await this.send('get_version_info', params)
  }

  /**
   * @onebot11
   * 重启OneBot实现
   */
  // async set_restart(params: WSSendParam['set_restart']) {
  //   return await this.send('set_restart', params)
  // }

  /**
   * @onebot11
   * 重启OneBot缓存
   */
  // async clean_cache(params: WSSendParam['clean_cache']) {
  //   return await this.send('clean_cache', params)
  // }

  /**
   * @gocqhttp
   * 设置qq名片
   */
  async set_qq_profile(params: WSSendParam['set_qq_profile']) {
    return await this.send('set_qq_profile', params)
  }

  /**
   * @gocqhttp
   * 企点获取qq信息
   */
  // async qidian_get_account_info(params: WSSendParam['qidian_get_account_info']) {
  //   return await this.send('qidian_get_account_info', params)
  // }

  /**
   * @gocqhttp
   * 获取型号设置
   */
  // async _get_model_show(params: WSSendParam['_get_model_show']) {
  //   return await this.send('_get_model_show', params)
  // }

  /**
   * @gocqhttp
   * 设置型号设置
   */
  // async _set_model_show(params: WSSendParam['_set_model_show']) {
  //   return await this.send('_set_model_show', params)
  // }

  /**
   * @gocqhttp
   * 获取在线客户端
   */
  async get_online_clients(params: WSSendParam['get_online_clients']) {
    return await this.send('get_online_clients', params)
  }

  /**
   * @gocqhttp
   * 获取单向好友列表
   */
  // async get_unidirectional_friend_list(params: WSSendParam['get_unidirectional_friend_list']) {
  //   return await this.send('get_unidirectional_friend_list', params)
  // }

  /**
   * @gocqhttp
   * 删除好友
   */
  // async delete_friend(params: WSSendParam['delete_friend']) {
  //   return await this.send('delete_friend', params)
  // }

  /**
   * @gocqhttp
   * 删除单向好友
   */
  // async delete_unidirectional_friend(params: WSSendParam['delete_unidirectional_friend']) {
  //   return await this.send('delete_unidirectional_friend', params)
  // }

  /**
   * @gocqhttp
   * 标记消息已读
   */
  async mark_msg_as_read(params: WSSendParam['mark_msg_as_read']) {
    return await this.send('mark_msg_as_read', params)
  }

  /**
   * @gocqhttp
   * 发送群合并信息
   */
  async send_group_forward_msg(params: WSSendParam['send_group_forward_msg']) {
    return await this.send('send_group_forward_msg', params)
  }

  /**
   * @gocqhttp
   * 发送私聊合并信息
   */
  async send_private_forward_msg(params: WSSendParam['send_private_forward_msg']) {
    return await this.send('send_private_forward_msg', params)
  }

  /**
   * @gocqhttp
   * 获取群聊历史记录
   */
  async get_group_msg_history(params: WSSendParam['get_group_msg_history']) {
    return await this.send('get_group_msg_history', params)
  }

  /**
   * @gocqhttp
   * OCR图片
   */
  async ocr_image(params: WSSendParam['ocr_image']) {
    return await this.send('ocr_image', params)
  }

  /**
   * @gocqhttp
   * IOCR图片
   */
  '.ocr_image' = async (params: WSSendParam['.ocr_image']) => {
    return await this.send('.ocr_image', params)
  }

  /**
   * @gocqhttp
   * 获取群聊系统信息
   */
  async get_group_system_msg(params: WSSendParam['get_group_system_msg']) {
    return await this.send('get_group_system_msg', params)
  }

  /**
   * @gocqhttp
   * 获取精华信息列表
   */
  async get_essence_msg_list(params: WSSendParam['get_essence_msg_list']) {
    return await this.send('get_essence_msg_list', params)
  }

  /**
   * @gocqhttp
   * 获取群聊@全体成员剩余次数
   */
  // async get_group_at_all_remain(params: WSSendParam['get_group_at_all_remain']) {
  //   return await this.send('get_group_at_all_remain', params)
  // }

  /**
   * @gocqhttp
   * 设置群头像
   */
  async set_group_portrait(params: WSSendParam['set_group_portrait']) {
    return await this.send('set_group_portrait', params)
  }

  /**
   * @gocqhttp
   * 设置群精华
   */
  async set_essence_msg(params: WSSendParam['set_essence_msg']) {
    return await this.send('set_essence_msg', params)
  }

  /**
   * @gocqhttp
   * 删除精华信息
   */
  async delete_essence_msg(params: WSSendParam['delete_essence_msg']) {
    return await this.send('delete_essence_msg', params)
  }

  /**
   * @gocqhttp
   * 设置群公告
   */
  async _send_group_notice(params: WSSendParam['_send_group_notice']) {
    return await this.send('_send_group_notice', params)
  }

  /**
   * @gocqhttp
   * 获取群公告
   */
  async _get_group_notice(params: WSSendParam['_get_group_notice']) {
    return await this.send('_get_group_notice', params)
  }

  /**
   * @gocqhttp
   * 上传群文件
   */
  async upload_group_file(params: WSSendParam['upload_group_file']) {
    return await this.send('upload_group_file', params)
  }

  /**
   * @gocqhttp
   * 删除群文件
   */
  async delete_group_file(params: WSSendParam['delete_group_file']) {
    return await this.send('delete_group_file', params)
  }

  /**
   * @gocqhttp
   * 创建群文件夹
   */
  async create_group_file_folder(params: WSSendParam['create_group_file_folder']) {
    return await this.send('create_group_file_folder', params)
  }

  /**
   * @gocqhttp
   * 删除群文件夹
   */
  async delete_group_folder(params: WSSendParam['delete_group_folder']) {
    return await this.send('delete_group_folder', params)
  }

  /**
   * @gocqhttp
   * 获取群文件信息
   */
  async get_group_file_system_info(params: WSSendParam['get_group_file_system_info']) {
    return await this.send('get_group_file_system_info', params)
  }

  /**
   * @gocqhttp
   * 获取群文件根目录列表
   */
  async get_group_root_files(params: WSSendParam['get_group_root_files']) {
    return await this.send('get_group_root_files', params)
  }

  /**
   * @gocqhttp
   * 获取群文件夹指定文件夹列表
   */
  async get_group_files_by_folder(params: WSSendParam['get_group_files_by_folder']) {
    return await this.send('get_group_files_by_folder', params)
  }

  /**
   * @gocqhttp
   * 获取群文件下载链接
   */
  async get_group_file_url(params: WSSendParam['get_group_file_url']) {
    return await this.send('get_group_file_url', params)
  }

  /**
   * @gocqhttp
   * 上传私聊文件
   */
  async upload_private_file(params: WSSendParam['upload_private_file']) {
    return await this.send('upload_private_file', params)
  }

  /**
   * @gocqhttp
   * 重新加载事件过滤器
   */
  // async reload_event_filter(params: WSSendParam['reload_event_filter']) {
  //   return await this.send('reload_event_filter', params)
  // }

  /**
   * @gocqhttp
   * 下载文件
   */
  async download_file(params: WSSendParam['download_file']) {
    return await this.send('download_file', params)
  }

  /**
   * @gocqhttp
   * 检查链接是否安全
   */
  // async check_url_safely(params: WSSendParam['check_url_safely']) {
  //   return await this.send('check_url_safely', params)
  // }

  /**
   * @gocqhttp
   * 获取中文分词
   */
  // async get_word_slices(params: WSSendParam['get_word_slices']) {
  //   return await this.send('get_word_slices', params)
  // }

  /**
   * @gocqhttp
   * 快速操作
   */
  '.handle_quick_operation' = async (params: WSSendParam['.handle_quick_operation']) => {
    return await this.send('.handle_quick_operation', params)
  }

  /**
   * @napcat
   * 获取推荐群聊/用户信息
   */
  async ArkSharePeer(params: WSSendParam['ArkSharePeer']) {
    return await this.send('ArkSharePeer', params)
  }

  /**
   * @napcat
   * 获取推荐群聊信息
   */
  async ArkShareGroup(params: WSSendParam['ArkShareGroup']) {
    return await this.send('ArkShareGroup', params)
  }

  /**
   * @napcat
   * 重启NapCat
   */
  // async reboot_normal(params: WSSendParam['reboot_normal']) {
  //   return await this.send('reboot_normal', params)
  // }

  /**
   * @napcat
   * 获取机器人列表
   */
  async get_robot_uin_range(params: WSSendParam['get_robot_uin_range']) {
    return await this.send('get_robot_uin_range', params)
  }

  /**
   * @napcat
   * 设置在线状态
   */
  async set_online_status(params: WSSendParam['set_online_status']) {
    return await this.send('set_online_status', params)
  }

  /**
   * @napcat
   * 获取分类后的好友列表
   */
  async get_friends_with_category(params: WSSendParam['get_friends_with_category']) {
    return await this.send('get_friends_with_category', params)
  }

  /**
   * @napcat
   * 设置头像
   */
  async set_qq_avatar(params: WSSendParam['set_qq_avatar']) {
    return await this.send('set_qq_avatar', params)
  }

  /**
   * @napcat
   * 获取文件信息
   */
  async get_file(params: WSSendParam['get_file']) {
    return await this.send('get_file', params)
  }

  /**
   * @napcat
   * 转发私聊信息
   */
  async forward_friend_single_msg(params: WSSendParam['forward_friend_single_msg']) {
    return await this.send('forward_friend_single_msg', params)
  }

  /**
   * @napcat
   * 转发群聊信息
   */
  async forward_group_single_msg(params: WSSendParam['forward_group_single_msg']) {
    return await this.send('forward_group_single_msg', params)
  }

  /**
   * @napcat
   * 英翻中
   */
  async translate_en2zh(params: WSSendParam['translate_en2zh']) {
    return await this.send('translate_en2zh', params)
  }

  /**
   * @napcat
   * 设置表情回复
   */
  async set_msg_emoji_like(params: WSSendParam['set_msg_emoji_like']) {
    return await this.send('set_msg_emoji_like', params)
  }

  /**
   * @napcat
   * 发送合并信息
   */
  async send_forward_msg(params: WSSendParam['send_forward_msg']) {
    return await this.send('send_forward_msg', params)
  }

  /**
   * @napcat
   * 标记私聊消息已读
   */
  async mark_private_msg_as_read(params: WSSendParam['mark_private_msg_as_read']) {
    return await this.send('mark_private_msg_as_read', params)
  }

  /**
   * @napcat
   * 标记群聊消息已读
   */
  async mark_group_msg_as_read(params: WSSendParam['mark_group_msg_as_read']) {
    return await this.send('mark_group_msg_as_read', params)
  }

  /**
   * @napcat
   * 获取好友信息列表
   */
  async get_friend_msg_history(params: WSSendParam['get_friend_msg_history']) {
    return await this.send('get_friend_msg_history', params)
  }

  /**
   * @napcat
   * 创建收藏
   */
  async create_collection(params: WSSendParam['create_collection']) {
    return await this.send('create_collection', params)
  }

  /**
   * @napcat
   * 获取收藏列表
   */
  async get_collection_list(params: WSSendParam['get_collection_list']) {
    return await this.send('get_collection_list', params)
  }

  /**
   * @napcat
   * 设置签名
   */
  async set_self_longnick(params: WSSendParam['set_self_longnick']) {
    return await this.send('set_self_longnick', params)
  }

  /**
   * @napcat
   * 获取最近聊天信息
   */
  async get_recent_contact(params: WSSendParam['get_recent_contact']) {
    return await this.send('get_recent_contact', params)
  }

  /**
   * @napcat
   * 标记所有消息已读
   */
  async _mark_all_as_read(params: WSSendParam['_mark_all_as_read']) {
    return await this.send('_mark_all_as_read', params)
  }

  /**
   * @napcat
   * 获取资料信息 (?)
   */
  async get_profile_like(params: WSSendParam['get_profile_like']) {
    return await this.send('get_profile_like', params)
  }

  /**
   * @napcat
   * 获取自定义表情
   */
  async fetch_custom_face(params: WSSendParam['fetch_custom_face']) {
    return await this.send('fetch_custom_face', params)
  }

  /**
   * @napcat
   * 获取表情包
   */
  async fetch_emoji_like(params: WSSendParam['fetch_emoji_like']) {
    return await this.send('fetch_emoji_like', params)
  }

  /**
   * @napcat
   * 设置输入状态
   */
  async set_input_status(params: WSSendParam['set_input_status']) {
    return await this.send('set_input_status', params)
  }

  /**
   * @napcat
   * 获取群聊额外信息
   */
  async get_group_info_ex(params: WSSendParam['get_group_info_ex']) {
    return await this.send('get_group_info_ex', params)
  }

  /**
   * @napcat
   * 获取群忽略添加列表
   */
  async get_group_ignore_add_request(params: WSSendParam['get_group_ignore_add_request']) {
    return await this.send('get_group_ignore_add_request', params)
  }

  /**
   * @napcat
   * 删除群公告
   */
  async _del_group_notice(params: WSSendParam['_del_group_notice']) {
    return await this.send('_del_group_notice', params)
  }

  /**
   * @napcat
   * 获取用户资料信息 (?)
   */
  async fetch_user_profile_like(params: WSSendParam['fetch_user_profile_like']) {
    return await this.send('fetch_user_profile_like', params)
  }

  /**
   * @napcat
   * 好友戳一戳
   */
  async friend_poke(params: WSSendParam['friend_poke']) {
    return await this.send('friend_poke', params)
  }

  /**
   * @napcat
   * 群聊戳一戳
   */
  async group_poke(params: WSSendParam['group_poke']) {
    return await this.send('group_poke', params)
  }

  /**
   * @napcat
   * 获取PacketServer状态
   */
  async nc_get_packet_status(params: WSSendParam['nc_get_packet_status']) {
    return await this.send('nc_get_packet_status', params)
  }

  /**
   * @napcat
   * 获取陌生人信息
   */
  async nc_get_user_status(params: WSSendParam['nc_get_user_status']) {
    return await this.send('nc_get_user_status', params)
  }

  /**
   * @napcat
   * 获取Rkey
   */
  async nc_get_rkey(params: WSSendParam['nc_get_rkey']) {
    return await this.send('nc_get_rkey', params)
  }

  /**
   * @napcat
   * 获取群聊禁言列表
   */
  async get_group_shut_list(params: WSSendParam['get_group_shut_list']) {
    return await this.send('get_group_shut_list', params)
  }
}
