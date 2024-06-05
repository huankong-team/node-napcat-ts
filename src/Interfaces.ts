import { Send } from './Structs.js'

export interface NCWebsocketOptionsBaseUrl {
  baseUrl: string
  accessToken?: string
}

export interface NCWebsocketOptionsHost {
  protocol: 'ws' | 'wss'
  host: string
  port: number
  accessToken?: string
}

export type NCWebsocketOptions = NCWebsocketOptionsBaseUrl | NCWebsocketOptionsHost

// =====================================================================================

export interface WSCloseRes {
  code: number
  reason: string
}

export interface WSErrorRes {
  errno: number
  code: string
  syscall: string
  address: string
  port: number
}

export interface SocketHandler {
  'socket.eventConnecting': void
  'socket.apiConnecting': void
  'socket.eventOpen': void
  'socket.apiOpen': void
  'socket.eventClose': WSCloseRes
  'socket.apiClose': WSCloseRes
  'socket.eventError': WSErrorRes
  'socket.apiError': WSErrorRes
  socket: void | WSCloseRes | WSErrorRes
}

export interface APIRequest<T extends keyof WSSendParam> {
  action: T
  params: WSSendParam[T]
  echo: string
}

export interface APISuccessResponse<T extends keyof WSSendReturn> {
  status: 'ok'
  retcode: 0 // 返回码，0 为成功，非 0 为失败
  data: WSSendReturn[T]
  message: string // 信息
  wording: string
  echo: string
}

export interface APIErrorResponse {
  status: 'failed'
  retcode: 0
  data: null
  message: string // 信息
  wording: string
  echo: string
}

export interface ResponseHandler {
  onSuccess: (response: APISuccessResponse<keyof WSSendParam>) => void
  onFailure: (reason: APIErrorResponse) => void
  message: APIRequest<keyof WSSendParam>
}

export interface ApiHandler {
  'api.preSend': APIRequest<keyof WSSendParam>
  'api.response': APISuccessResponse<keyof WSSendReturn> | APIErrorResponse
  api: APIRequest<keyof WSSendParam> | APISuccessResponse<keyof WSSendReturn> | APIErrorResponse
}

// 心跳包
export interface HeartBeat {
  time: number
  self_id: number
  post_type: 'meta_event'
  meta_event_type: 'heartbeat'
  status: {
    online: boolean
    good: true
  }
  // 到下次的间隔
  interval: number
}

// 生命周期
export interface LifeCycle {
  time: number
  self_id: number
  post_type: 'meta_event'
  meta_event_type: 'lifecycle'
  sub_type: 'connect'
}

export interface MetaEventHandler {
  'meta_event.lifecycle': LifeCycle
  'meta_event.heartbeat': HeartBeat
  meta_event: HeartBeat | LifeCycle
}

// =====================================================================================

// 私聊消息
export interface PrivateMessage {
  message_format: 'string'
  time: number
  self_id: number
  user_id: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'private'
  sender: {
    user_id: number
    nickname: string
    card: string
  }
  raw_message: string
  font: number
  sub_type: 'friend'
  message: string
  post_type: 'message'
}

// 群消息
export interface GroupMessage {
  message_format: 'string'
  time: number
  self_id: number
  user_id: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'group'
  sender: {
    user_id: number
    nickname: string
    card: string
    role: 'owner' | 'admin' | 'member'
  }
  raw_message: string
  font: number
  sub_type: 'normal'
  message: string
  post_type: 'message'
  group_id: number
}

export interface MessageHandler {
  'message.private': PrivateMessage
  'message.group': GroupMessage
  message: PrivateMessage | GroupMessage
}

// =====================================================================================

export interface PrivateMessageSelf {
  message_format: 'string'
  time: number
  self_id: number
  user_id: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'private'
  sender: {
    user_id: number
    nickname: string
    card: string
  }
  raw_message: string
  font: number
  sub_type: 'friend'
  message: string
  post_type: 'message_sent'
}

export interface GroupMessageSelf {
  message_format: 'string'
  self_id: number
  user_id: number
  time: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'group'
  sender: {
    user_id: number
    nickname: string
    card: string
    role: 'owner' | 'admin' | 'member'
  }
  raw_message: string
  font: number
  sub_type: 'normal'
  message: string
  post_type: 'message_sent'
  group_id: number
}

export interface MessageSentHandler {
  'message_sent.private': PrivateMessageSelf
  'message_sent.group': GroupMessageSelf
  message_sent: PrivateMessageSelf | GroupMessageSelf
}

// =====================================================================================

// 加群请求／邀请
export interface RequestGroup {
  time: number
  self_id: number
  post_type: 'request'
  request_type: 'group'
  sub_type: 'add' | 'invite'
  group_id: number
  user_id: number
  comment: string
  flag: string
}

// 加好友请求
export interface RequestFriend {
  time: number
  self_id: number
  post_type: 'request'
  request_type: 'friend'
  user_id: number
  comment: string
  flag: string
}

export interface RequestHandler {
  'request.friend': RequestFriend
  'request.group': RequestGroup
  request: RequestGroup | RequestFriend
}

// =====================================================================================

export interface FriendRecall {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'friend_recall'
  user_id: number
  message_id: number
}

export interface GroupRecall {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_recall'
  group_id: number
  user_id: number
  operator_id: number
  message_id: number
}

export interface GroupIncrease {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_increase'
  sub_type: 'invite' | 'approve'
  group_id: number
  operator_id: number
  user_id: number
}

export interface GroupDecrease {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_decrease'
  sub_type: 'leave' | 'kick' | 'kick_me'
  group_id: number
  operator_id: number
  user_id: number
}

export interface GroupAdmin {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_admin'
  sub_type: 'set' | 'unset'
  group_id: number
  user_id: number
}

export interface GroupUpload {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_upload'
  group_id: number
  user_id: number
  file: {
    id: string
    name: string
    size: number
    busid: number
  }
}

export interface GroupBan {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_ban'
  sub_type: 'ban' | 'lift_ban'
  group_id: number
  operator_id: number
  user_id: number
  duration: number
}

export interface FriendAdd {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'friend_add'
  user_id: number
}

export interface NotifyPokeFriend {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'poke'
  sender_id: number
  user_id: number
  target_id: number
}

export interface NotifyPokeGroup {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'poke'
  group_id: number
  user_id: number
  target_id: number
}

export interface NotifyLuckyKing {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'lucky_king'
  group_id: number
  user_id: number
  target_id: number
}

export interface NotifyHonor {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'honor'
  group_id: number
  honor_type: 'talkative' | 'performer' | 'emotion'
  user_id: number
}

export interface NotifyTitle {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'title'
  group_id: number
  user_id: number
  title: string
}

export interface GroupCard {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_card'
  group_id: number
  user_id: number
  card_new: string
  card_old: string
  cardName: string
}

export interface OfflineFile {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'offline_file'
  user_id: number
  file: {
    name: string
    size: number
    url: string
  }
}

export interface ClientStatus {
  post_type: 'notice'
  notice_type: 'client_status'
  client: {
    app_id: number
    device: string
    device_kind: string
  }
  online: boolean
}

export interface Essence {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'essence'
  sub_type: 'add' | 'delete'
  group_id: number
  sender_id: number
  operator_id: number
  message_id: number
}

export interface GroupMsgEmojiLike {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_msg_emoji_like'
  group_id: number
  user_id: number
  meta_id: number
  likes: { emoji_id: string; count: number }[]
}

export interface NoticeHandler {
  'notice.friend_recall': FriendRecall
  'notice.group_recall': GroupRecall
  'notice.group_increase': GroupIncrease
  'notice.group_decrease': GroupDecrease
  'notice.group_admin': GroupAdmin
  'notice.group_upload': GroupUpload
  'notice.group_ban': GroupBan
  'notice.friend_add': FriendAdd
  'notice.notify.poke.friend': NotifyPokeFriend
  'notice.notify.poke.group': NotifyPokeGroup
  // 'notice.notify.lucky_king': NotifyLuckyKing
  // 'notice.notify.honor': NotifyHonor
  'notice.notify.title': NotifyTitle
  'notice.notify': NotifyTitle | NotifyPokeFriend | NotifyPokeGroup
  //  | NotifyLuckyKing | NotifyHonor |
  'notice.group_card': GroupCard
  // 'notice.offline_file': OfflineFile
  // 'notice.client_status': ClientStatus
  // 'notice.essence': Essence
  'notice.group_msg_emoji_like': GroupMsgEmojiLike
  notice:
    | FriendRecall
    | GroupRecall
    | GroupIncrease
    | GroupDecrease
    | GroupAdmin
    | GroupUpload
    | GroupBan
    | FriendAdd
    | NotifyPokeFriend
    | NotifyPokeGroup
    // | NotifyLuckyKing
    // | NotifyHonor
    | NotifyTitle
    | GroupCard
    // | OfflineFile
    // | ClientStatus
    // | Essence
    | GroupMsgEmojiLike
}

// =====================================================================================

export type AllHandlers = SocketHandler &
  ApiHandler &
  MessageHandler &
  MessageSentHandler &
  MetaEventHandler &
  RequestHandler &
  NoticeHandler

export type WSReceiveHandler = MessageHandler &
  MessageSentHandler &
  MetaEventHandler &
  RequestHandler &
  NoticeHandler

export type EventHandle<T extends keyof AllHandlers> = (context: AllHandlers[T]) => any

// =====================================================================================

export type WSSendParam = {
  // ===================================NAPCAT扩展==============================================
  reboot_normal: { delay: number }
  get_robot_uin_range: {}
  set_online_status: { status: number; extStatus: number; batteryStatus: number }
  get_friends_with_category: {}
  // get_group_ignore_add_request: {}
  set_qq_avatar: { file: string }
  // get_config: {}
  // set_config: {}
  debug: { method: string; args: any[] }
  get_file: { file_id: string }
  forward_friend_single_msg: { message_id: number; user_id: number }
  forward_group_single_msg: { message_id: number; group_id: number }
  translate_en2zh: { words: string[] }
  get_group_file_count: { group_id: number }
  get_group_file_list: { group_id: number; start_index: number; file_count: number }
  set_group_file_folder: { group_id: number; folder_name: string }
  del_group_file: { group_id: number; file_id: string }
  del_group_file_folder: { group_id: number; folder_id: string }
  // ===================================ONEBOT接口==============================================
  reboot: { delay: number }
  send_like: { user_id: number; times: number }
  get_login_info: {}
  get_friend_list: {}
  get_group_info: { group_id: number }
  get_group_list: {}
  get_group_member_info: { group_id: number; user_id: number; no_cache?: boolean }
  get_group_member_list: { group_id: number; no_cache?: boolean }
  get_msg: { message_id: number }
  send_msg: ({ user_id: number } | { group_id: number }) & {
    message: string | Send['node'][]
    auto_escape: boolean
  }
  send_group_msg: { message: string | Send['node'][]; auto_escape: boolean }
  send_private_msg: { message: string | Send['node'][]; auto_escape: boolean }
  delete_msg: { message_id: number }
  set_msg_emoji_like: { message_id: number; emoji_id: string }
  set_group_add_request: { flag: string; approve?: boolean; reason?: string }
  set_friend_add_request: { flag: string; approve?: boolean; remark?: string }
  set_group_leave: { group_id: number; is_dismiss?: boolean }
  get_version_info: {}
  get_status: {}
  can_send_record: {}
  can_send_image: {}
  set_group_kick: { group_id: number; user_id: number; reject_add_request: boolean }
  set_group_ban: { group_id: number; user_id: number; duration: number }
  set_group_whole_ban: { group_id: number; enable?: boolean }
  set_group_admin: { group_id: number; user_id: number; enable?: boolean }
  set_group_card: { group_id: number; user_id: number; card: string }
  set_group_name: { group_id: number; group_name: string }
  get_image: { file: string }
  get_record: { file: string }
  clean_cache: {}
  get_cookies: { domain: string }
  // ===================================GOCQHTTP扩展==============================================
  '.handle_quick_operation':
    | {
        context: PrivateMessage
        operation: { reply?: string; auto_escape?: boolean }
      }
    | {
        context: GroupMessage
        operation: {
          reply?: string
          auto_escape?: boolean
          at_sender?: boolean
          delete?: boolean
          kick?: boolean
          ban?: boolean
          ban_duration?: number
        }
      }
    | {
        context: RequestFriend
        operation: { approve?: boolean; remark?: string }
      }
    | {
        context: RequestGroup
        operation: { approve?: boolean; reason?: string }
      }
  get_group_honor_info: {
    group_id: number
    type: 'all' | 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion'
  }
  get_essence_msg_list: { group_id: number; pages: number }
  _send_group_notice: {
    group_id: number
    content: string
    image?: string
    pinned?: number
    confirmRequired?: number
  }
  _get_group_notice: { group_id: number }
  send_forward_msg: ({ user_id: number } | { group_id: number }) & {
    message: Send['node'][]
    auto_escape: boolean
  }
  send_group_forward_msg: {
    group_id: number
    message: Send['node'][]
    auto_escape: boolean
  }
  send_private_forward_msg: {
    user_id: number
    message: Send['node'][]
    auto_escape: boolean
  }
  get_stranger_info: { user_id: number }
  mark_msg_as_read: { message_id: number }
  get_guild_list: {}
  mark_private_msg_as_read: { user_id: number }
  mark_group_msg_as_read: { group_id: number }
  upload_group_file: {
    group_id: number
    file: string
    name: string
    // folder?: string
    folder_id?: string
  }
  download_file: ({ url: string } | { base64: string }) & {
    thread_count: number
    name: string
    headers: string | string[]
  }
  get_group_msg_history: { group_id: number; message_seq: number; count: number }
  get_forward_msg: { messager_id: string }
  get_friend_msg_history: { user_id: number; message_seq: number; count: number }
  get_group_system_msg: { group_id: number }
  get_online_clients: { no_cache?: boolean }
  ocr_image: { image: string }
  set_self_profile: { nick: string; longNick: string; sex: number }
}

export type WSSendReturn = {
  // ===================================NAPCAT扩展==============================================
  reboot_normal: {}
  get_robot_uin_range: { minUin: number; maxUin: number }[]
  set_online_status: {}
  get_friends_with_category: {
    categoryId: number
    categoryName: string
    categoryMbCount: number
    buddyList: {
      uid: string
      qid: string
      uin: string
      nick: string
      remark: string
      longNick: string
      avatarUrl: string
      birthday_year: number
      birthday_month: number
      birthday_day: number
      sex: number
      topTime: string
      isBlock: boolean
      isMsgDisturb: boolean
      isSpecialCareOpen: boolean
      isSpecialCareZone: boolean
      ringId: string
      status: number
      qidianMasterFlag: number
      qidianCrewFlag: number
      qidianCrewFlag2: number
      extStatus: number
      categoryId: number
      onlyChat: boolean
      qzoneNotWatch: boolean
      qzoneNotWatched: boolean
      vipFlag: boolean
      yearVipFlag: boolean
      svipFlag: boolean
      vipLevel: number
      isZPlanCoupleOpen: boolean
      zplanCoupleSceneId: number
      teenagerFlag: number
      studyFlag: number
      pendantId: string
    }[]
  }[]
  // get_group_ignore_add_request: {}
  set_qq_avatar: {}
  // get_config: {}
  // set_config: {}
  debug: any
  get_file: { file: string; url: string; file_size: string; file_name: string; base64: string }
  forward_friend_single_msg: {}
  forward_group_single_msg: {}
  translate_en2zh: string[]
  get_group_file_count: { count: number }
  get_group_file_list: {
    FileList: (
      | {
          peerId: string
          type: 1
          folderInfo: null
          fileInfo: {
            fileModelId: string
            fileId: string
            fileName: string
            fileSize: string
            busId: number
            uploadedSize: string
            uploadTime: number
            deadTime: number
            modifyTime: number
            downloadTimes: number
            sha: string
            sha3: string
            md5: string
            uploaderLocalPath: string
            uploaderName: string
            uploaderUin: string
            parentFolderId: string
            localPath: string
            transStatus: number
            transType: number
            elementId: string
            isFolder: false
          }
        }
      | {
          peerId: string
          type: 2
          folderInfo: {
            folderId: string
            parentFolderId: string
            folderName: string
            createTime: number
            modifyTime: number
            createUin: string
            creatorName: string
            totalFileCount: number
            modifyUin: string
            modifyName: string
            usedSpace: string
          }
          fileInfo: null
        }
    )[]
  }
  set_group_file_folder: {}
  del_group_file: {}
  del_group_file_folder: {}
  // ===================================ONEBOT接口==============================================
  reboot: {}
  send_like: {}
  get_login_info: { user_id: number; nickname: string }
  get_friend_list: {
    user_id: number
    nickname: string
    remark: string
    sex: 'unknown' | 'male' | 'female'
    level: number
  }[]
  get_group_info: {
    group_id: number
    group_name: string
    member_count: number
    max_member_count: number
  }
  get_group_list: {
    group_id: number
    group_name: string
    member_count: number
    max_member_count: number
  }[]
  get_group_member_info: {
    group_id: number
    user_id: number
    nickname: string
    card: string
    sex: 'unknown' | 'male' | 'female'
    age: number
    area: string
    level: string
    qq_level: number
    join_time: number
    last_sent_time: number
    title_expire_time: number
    unfriendly: boolean
    card_changeable: boolean
    is_robot: boolean
    shut_up_timestamp: number
    role: 'admin' | 'owner' | 'member'
    title: string
    qage: number
  }
  get_group_member_list: {
    group_id: number
    user_id: number
    nickname: string
    card: string
    sex: 'unknown' | 'male' | 'female'
    age: number
    area: string
    level: string
    qq_level: number
    join_time: number
    last_sent_time: number
    title_expire_time: number
    unfriendly: boolean
    card_changeable: boolean
    is_robot: boolean
    shut_up_timestamp: number
    role: 'admin' | 'owner' | 'member'
    title: string
    qage: number
  }[]
  get_msg: (
    | {
        message_type: 'private'
        sender: {
          user_id: number
          nickname: string
          card: string
        }
        sub_type: 'friend'
      }
    | {
        message_type: 'group'
        group_id: number
        sender: {
          user_id: number
          nickname: string
          card: string
          role: 'owner' | 'admin' | 'member'
        }
        sub_type: 'normal'
      }
  ) & {
    self_id: number
    user_id: number
    time: number
    message_id: number
    message_seq: number
    real_id: number
    raw_message: string
    font: number
    message_format: 'string'
    post_type: 'message'
  }
  send_msg: { message_id: number }
  send_group_msg: { message_id: number }
  send_private_msg: { message_id: number }
  delete_msg: {}
  set_msg_emoji_like: {}
  set_group_add_request: {}
  set_friend_add_request: {}
  set_group_leave: {}
  get_version_info: { app_name: 'NapCat.Onebot'; protocol_version: 'v11'; app_version: string }
  get_status: {
    online: boolean
    good: true
    stat: {
      packet_received: number
      packet_sent: number
      message_received: number
      message_sent: number
      last_message_time: number
      disconnect_times: number
      lost_times: number
      packet_lost: number
    }
  }
  can_send_record: { yes: true }
  can_send_image: { yes: true }
  set_group_kick: {}
  set_group_ban: {}
  set_group_whole_ban: {}
  set_group_admin: {}
  set_group_card: {}
  set_group_name: {}
  get_image: { file: string; url: string; file_size: string; file_name: string; base64: string }
  get_record: { file: string; url: string; file_size: string; file_name: string; base64: string }
  clean_cache: {}
  get_cookies: { cookies: string }
  // ===================================GOCQHTTP扩展==============================================
  '.handle_quick_operation': {}
  get_group_honor_info: {
    group_id: string
    current_talkative: {
      user_id: number
      avatar: string
      nickname: string
      day_count: number
      description: string
    }
    talkative_list: {
      user_id: number
      avatar: string
      nickname: string
      day_count: number
      description: string
    }[]
    performer_list: {
      user_id: number
      avatar: string
      nickname: string
      day_count: number
      description: string
    }[]
    legend_list: {
      user_id: number
      avatar: string
      nickname: string
      day_count: number
      description: string
    }[]
    emotion_list: {
      user_id: number
      avatar: string
      nickname: string
      day_count: number
      description: string
    }[]
    strong_newbie_list: {
      user_id: number
      avatar: string
      nickname: string
      day_count: number
      description: string
    }[]
  }
  get_essence_msg_list: {
    retcode: 0
    retmsg: 'success'
    data: {
      msg_list: {
        group_code: string
        msg_seq: number
        msg_random: number
        sender_uin: string
        sender_nick: string
        sender_time: number
        add_digest_uin: string
        add_digest_nick: string
        add_digest_time: number
        msg_content: (
          | {
              msg_type: 1
              text: string
            }
          // | {
          //     msg_type: 2
          //   }
          | {
              msg_type: 3
              image_url: string
              image_thumbnail_url: string
            }
        )[]
        can_be_removed: true
      }[]
      is_end: boolean
      group_role: boolean
      config_page_url: string
    }
  }
  _send_group_notice: {}
  _get_group_notice: {
    sender_id: number
    publish_time: number
    message: {
      text: string
      image: {
        id: string
        height: string
        width: string
      }[]
    }
  }[]
  send_forward_msg: {}
  send_group_forward_msg: {}
  send_private_forward_msg: {}
  get_stranger_info: {
    uid: string
    qid: string
    uin: string
    nick: string
    remark: string
    longNick: string
    avatarUrl: string
    birthday_year: number
    birthday_month: number
    birthday_day: number
    sex: 'unknown' | 'male' | 'female'
    topTime: string
    constellation: number
    shengXiao: number
    kBloodType: number
    homeTown: string
    makeFriendCareer: number
    pos: string
    eMail: string
    phoneNum: string
    college: string
    country: string
    province: string
    city: string
    postCode: string
    address: string
    isBlock: boolean
    isSpecialCareOpen: boolean
    isSpecialCareZone: boolean
    ringId: string
    regTime: number
    interest: string
    termType: number
    labels: string[]
    qqLevel: {
      crownNum: number
      sunNum: number
      moonNum: number
      starNum: number
    }
    isHideQQLevel: number
    privilegeIcon: {
      jumpUrl: string
      openIconList: string[]
      closeIconList: string[]
    }
    isHidePrivilegeIcon: number
    photoWall: {
      picList: string[]
    }
    vipFlag: boolean
    yearVipFlag: boolean
    svipFlag: boolean
    vipLevel: number
    status: number
    qidianMasterFlag: number
    qidianCrewFlag: number
    qidianCrewFlag2: number
    extStatus: number
    recommendImgFlag: number
    disableEmojiShortCuts: number
    pendantId: string
    user_id: number
    nickname: string
    age: number
    login_days: number
    level: number
  }
  mark_msg_as_read: {}
  get_guild_list: {}
  mark_private_msg_as_read: {}
  mark_group_msg_as_read: {}
  upload_group_file: {}
  download_file: { file: string }
  get_group_msg_history: {
    messages: ((
      | {
          message_type: 'private'
          sender: {
            user_id: number
            nickname: string
            card: string
          }
          sub_type: 'friend'
        }
      | {
          message_type: 'group'
          group_id: number
          sender: {
            user_id: number
            nickname: string
            card: string
            role: 'owner' | 'admin' | 'member'
          }
          sub_type: 'normal'
        }
    ) & {
      self_id: number
      user_id: number
      time: number
      message_id: number
      message_seq: number
      real_id: number
      raw_message: string
      font: number
      message_format: 'string'
      post_type: 'message'
    })[]
  }
  get_forward_msg: {
    messages: ((
      | {
          message_type: 'private'
          sender: {
            user_id: number
            nickname: string
            card: string
          }
          sub_type: 'friend'
        }
      | {
          message_type: 'group'
          group_id: number
          sender: {
            user_id: number
            nickname: string
            card: string
            role: 'owner' | 'admin' | 'member'
          }
          sub_type: 'normal'
        }
    ) & {
      self_id: number
      user_id: number
      time: number
      message_id: number
      message_seq: number
      real_id: number
      raw_message: string
      font: number
      message_format: 'string'
      post_type: 'message'
    })[]
  }
  get_friend_msg_history: {
    messages: ((
      | {
          message_type: 'private'
          sender: {
            user_id: number
            nickname: string
            card: string
          }
          sub_type: 'friend'
        }
      | {
          message_type: 'group'
          group_id: number
          sender: {
            user_id: number
            nickname: string
            card: string
            role: 'owner' | 'admin' | 'member'
          }
          sub_type: 'normal'
        }
    ) & {
      self_id: number
      user_id: number
      time: number
      message_id: number
      message_seq: number
      real_id: number
      raw_message: string
      font: number
      message_format: 'string'
      post_type: 'message'
    })[]
  }
  get_group_system_msg: {
    invited_requests: {
      request_id: number
      invitor_uin: number
      invitor_nick: string
      group_id: number
      group_name: string
      checked: boolean
      actor: number
    }[]
    join_requests: {
      request_id: number
      requester_uin: number
      requester_nick: string
      message: string
      group_id: number
      group_name: string
      checked: boolean
      actor: number
    }[]
  }
  get_online_clients: { app_id: string; device_name: string; device_kind: string }[]
  ocr_image: {
    text: string
    pt1: { x: string; y: string }
    pt2: { x: string; y: string }
    pt3: { x: string; y: string }
    pt4: { x: string; y: string }
    charBox: {
      charText: string
      charBox: {
        pt1: { x: string; y: string }
        pt2: { x: string; y: string }
        pt3: { x: string; y: string }
        pt4: { x: string; y: string }
      }
    }[]
    score: string
  }[]
  // ==============
  set_self_profile: { retcode: 0; retmsg: 'success'; data: {} }
}
