import { Receive, Send } from './Structs.js'

export interface NCWebsocketOptionsBaseUrl {
  baseUrl: string
  accessToken?: string
  reconnection?: {
    enable?: boolean
    attempts?: number
    delay?: number
  }
}

export interface NCWebsocketOptionsHost {
  protocol: 'ws' | 'wss'
  host: string
  port: number
  accessToken?: string
  reconnection?: {
    enable?: boolean
    attempts?: number
    delay?: number
  }
}

export type NCWebsocketOptions = NCWebsocketOptionsBaseUrl | NCWebsocketOptionsHost

// =====================================================================================

export interface WSReconnection {
  enable: boolean
  attempts: number
  delay: number
  nowAttempts: number
}

export interface WSConnecting {
  reconnection: WSReconnection
}

export interface WSOpenRes {
  reconnection: WSReconnection
}

export interface WSCloseRes {
  code: number
  reason: string
  reconnection: WSReconnection
}

export type WSErrorRes = {
  reconnection: WSReconnection
} & (
  | {
      error_type: 'response_error'
      info: {
        errno: number
        message: string
        url: string
      }
    }
  | {
      error_type: 'connect_error'
      errors: {
        errno: number
        code: string
        syscall: string
        address: string
        port: number
      }[]
    }
)

export interface SocketHandler {
  'socket.connecting': WSConnecting
  'socket.open': WSOpenRes
  'socket.close': WSCloseRes
  'socket.error': WSErrorRes
  socket: WSConnecting | WSOpenRes | WSCloseRes | WSErrorRes
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
  onSuccess: (response: APISuccessResponse<keyof WSSendReturn>) => void
  onFailure: (reason: APIErrorResponse) => void
  message: APIRequest<keyof WSSendParam>
}

export interface ApiHandler {
  'api.preSend': APIRequest<keyof WSSendParam>
  'api.response.success': APISuccessResponse<keyof WSSendReturn>
  'api.response.failure': APIErrorResponse
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
    good: boolean
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

export type ArrayMessage = {
  message_format: 'array'
  message: Receive[keyof Receive][]
}

export type MessageType = ArrayMessage

// 私聊消息
export type PrivateMessage = {
  self_id: number
  user_id: number
  time: number
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
  post_type: 'message'
} & MessageType

// 群消息
export type GroupMessage = {
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
  post_type: 'message'
  group_id: number
} & MessageType

export interface MessageHandler {
  'message.private': PrivateMessage
  'message.group': GroupMessage
  message: PrivateMessage | GroupMessage
}

// =====================================================================================

export type PrivateMessageSelf = {
  self_id: number
  user_id: number
  time: number
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
  post_type: 'message_sent'
} & MessageType

export type GroupMessageSelf = {
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
  post_type: 'message_sent'
  group_id: number
} & MessageType

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
  group_id: number
  user_id: number
  request_type: 'group'
  comment: string
  flag: string
  sub_type: 'add' | 'invite'
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
  group_id: number
  user_id: number
  notice_type: 'group_recall'
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
  group_id: number
  user_id: number
  notice_type: 'group_decrease'
  sub_type: 'leave' | 'kick' | 'kick_me'
  operator_id: number
}

export interface GroupAdmin {
  time: number
  self_id: number
  post_type: 'notice'
  group_id: number
  user_id: number
  notice_type: 'group_admin'
  sub_type: 'set' | 'unset'
}

export interface GroupUpload {
  time: number
  self_id: number
  post_type: 'notice'
  group_id: number
  user_id: number
  notice_type: 'group_upload'
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
  group_id: number
  user_id: number
  notice_type: 'group_ban'
  operator_id: number
  duration: number
  sub_type: 'ban' | 'lift_ban'
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
  target_id: number
  user_id: number
  raw_info: [
    { col: string; nm: string; type: 'qq'; uid: string },
    { col: string; nm: string; tp: string; type: 'qq'; uid: string }
  ]
}

export interface NotifyPokeGroup {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'poke'
  target_id: number
  user_id: number
  group_id: number
  raw_info: [
    { col: string; nm: string; type: 'qq'; uid: string },
    { jp: string; src: string; type: 'img' },
    { txt: string; type: 'nor' },
    { col: string; nm: string; tp: string; type: 'qq'; uid: string },
    { txt: string; type: 'nor' }
  ]
}

export interface Essence {
  time: number
  self_id: number
  post_type: 'notice'
  group_id: number
  user_id: number
  notice_type: 'essence'
  message_id: number
  sender_id: number
  sub_type: 'add' | 'delete'
}

// TODO: 收不到
export interface GroupMsgEmojiLike {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'group_msg_emoji_like'
  group_id: number
  user_id: number
  message_id: number
  likes: { emoji_id: string; count: number }[]
}

export interface NotifyInputStatusGroup {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'input_status'
  status_text: string
  event_type: number
  user_id: number
  group_id: number
}

export interface NotifyInputStatusFriend {
  time: number
  self_id: number
  post_type: 'notice'
  notice_type: 'notify'
  sub_type: 'input_status'
  status_text: string
  event_type: number
  user_id: number
  group_id: 0
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
  'notice.notify.input_status.friend': NotifyInputStatusFriend
  'notice.notify.input_status.group': NotifyInputStatusGroup
  'notice.notify.input_status': NotifyInputStatusFriend | NotifyInputStatusGroup
  'notice.notify.poke.friend': NotifyPokeFriend
  'notice.notify.poke.group': NotifyPokeGroup
  'notice.notify.poke': NotifyPokeFriend | NotifyPokeGroup
  'notice.notify':
    | NotifyPokeFriend
    | NotifyPokeGroup
    | NotifyInputStatusFriend
    | NotifyInputStatusGroup
  'notice.essence': Essence
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
    | Essence
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
  ArkShareGroup: { group_id: string } | { user_id: string; phoneNumber?: string }
  ArkSharePeer: { group_id: string }
  // reboot_normal: { delay?: number }
  get_robot_uin_range: {}
  set_online_status: { status: number; ext_status: number; battery_status: number }
  get_friends_with_category: {}
  // get_group_ignore_add_request: {}
  set_qq_avatar: { file: string }
  // get_config: {}
  // set_config: {}
  // debug: { method: string; args: any[] }
  get_file: { file_id: string }
  forward_friend_single_msg: { message_id: number; user_id: number }
  forward_group_single_msg: { message_id: number; group_id: number }
  translate_en2zh: { words: string[] }
  get_group_file_count: { group_id: number }
  get_group_file_list: {
    group_id: number
    start_index: number
    file_count: number
    folder_id: number
  }
  set_group_file_folder: { group_id: number; folder_name: string }
  del_group_file: { group_id: number; file_id: string }
  del_group_file_folder: { group_id: number; folder_id: string }
  // set_restart: { delay?: number }
  send_like: { user_id: number; times: number }
  get_login_info: {}
  get_friend_list: {}
  get_group_info: { group_id: number }
  get_group_list: {}
  get_group_member_info: { group_id: number; user_id: number; no_cache?: boolean }
  get_group_member_list: { group_id: number; no_cache?: boolean }
  get_msg: { message_id: number }
  send_msg: ({ user_id: number } | { group_id: number }) & { message: Send[keyof Send][] }
  send_group_msg: { group_id: number; message: Send[keyof Send][] }
  send_private_msg: { user_id: number; message: Send[keyof Send][] }
  delete_msg: { message_id: number }
  set_msg_emoji_like: { message_id: number; emoji_id: string }
  set_group_add_request: { flag: string; approve?: boolean; reason?: string }
  set_friend_add_request: { flag: string; approve?: boolean; remark?: string }
  set_group_leave: { group_id: number; is_dismiss?: boolean }
  get_version_info: {}
  get_status: {}
  can_send_record: {}
  can_send_image: {}
  set_group_kick: { group_id: number; user_id: number; reject_add_request?: boolean }
  set_group_ban: { group_id: number; user_id: number; duration: number }
  set_group_whole_ban: { group_id: number; enable?: boolean }
  set_group_admin: { group_id: number; user_id: number; enable?: boolean }
  set_group_card: { group_id: number; user_id: number; card: string }
  set_group_name: { group_id: number; group_name: string }
  get_image: { file: string }
  get_record: { file: string }
  // clean_cache: {}
  get_cookies: { domain: string }
  '.handle_quick_operation':
    | { context: PrivateMessage; operation: { reply?: Send[keyof Send][] } }
    | { context: GroupMessage; operation: { reply?: Send[keyof Send][]; at_sender?: boolean } }
    | { context: RequestFriend; operation: { approve?: boolean } }
    | { context: RequestGroup; operation: { approve?: boolean; reason?: string } }
  get_group_honor_info: {
    group_id: number
    type?: 'all' | 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion'
  }
  get_essence_msg_list: { group_id: number }
  _send_group_notice: {
    group_id: number
    content: string
    image?: string
    pinned?: number
    confirmRequired?: number
  }
  _get_group_notice: { group_id: number }
  send_forward_msg: ({ user_id: number } | { group_id: number }) & { message: Send['node'][] }
  send_group_forward_msg: { group_id: number; message: Send['node'][] }
  send_private_forward_msg: { user_id: number; message: Send['node'][] }
  get_stranger_info: { user_id: number }
  mark_msg_as_read: { user_id: number } | { group_id: number }
  // get_guild_list: {}
  mark_private_msg_as_read: { user_id: number }
  mark_group_msg_as_read: { group_id: number }
  upload_group_file: {
    group_id: number
    file: string
    name: string
    // folder?: string
    folder_id?: string
  }
  delete_group_file: WSSendParam['del_group_file']
  create_group_file_folder: WSSendParam['set_group_file_folder']
  delete_group_file_folder: WSSendParam['del_group_file_folder']
  get_group_file_system_info: { group_id: number }
  get_group_root_files: { group_id: number }
  get_group_files_by_folder: { group_id: number; folder_id: string }
  download_file:
    | { base64: string }
    | {
        url: string
        // thread_count: number
        name?: string
        headers?: string | string[]
      }
  get_group_msg_history: {
    group_id: number
    message_seq?: number
    count?: number
    reverseOrder?: boolean
  }
  get_forward_msg: { messager_id: string }
  get_friend_msg_history: {
    user_id: number
    message_seq?: number
    count?: number
    reverseOrder?: boolean
  }
  get_group_ignored_notifies: { group_id: number }
  // get_online_clients: { no_cache?: boolean }
  ocr_image: { image: string }
  set_self_profile: { nickname: string; personal_note?: string; sex?: number }
  create_collection: { rawData: string; brief: string }
  get_collection_list: { category: number; count: number }
  set_self_longnick: { longNick: string }
  set_essence_msg: { message_id: number }
  delete_essence_msg: { message_id: number }
  get_recent_contact: { count?: number }
  _mark_all_as_read: {}
  get_profile_like: {}
  set_group_portrait: { file: string; groupCode: number }
  fetch_custom_face: { count?: number }
  upload_private_file: { user_id: number; file: string; name: string }
  fetch_emoji_like: {
    emojiId: string
    emojiType: string
    message_id: number
    count?: number
  }
  // test_api_01: {}
  // get_guild_service_profile: {}
  // _set_model_show: {}
  set_input_status: ({ group_id: string } | { user_id: string }) & { eventType: string }
  // get_csrf_token: {}
  _del_group_notice: { group_id: number; notice_id: string }
  get_group_info_ex: { group_id: number }
  get_group_system_msg: { group_id: number }
}

export type WSSendReturn = {
  ArkShareGroup: {
    errCode: 0
    errMsg: ''
    arkJson: string
  }
  ArkSharePeer: string
  // reboot_normal: {}
  get_robot_uin_range: {
    minUin: string
    maxUin: string
  }[]
  set_online_status: {}
  get_friends_with_category: {
    categoryId: number
    categorySortId: number
    categoryName: string
    categoryMbCount: number
    onlineCount: number
    buddyList: {
      qid: string
      longNick: string
      birthday_year: number
      birthday_month: number
      birthday_day: number
      age: number
      sex: 'unknown' | 'male' | 'female'
      eMail: string
      phoneNum: string
      categoryId: number
      richTime: number
      richBuffer: { [key: string]: number }
      uid: string
      uin: string
      nick: string
      remark: string
      user_id: number
      nickname: string
      level: number
    }[]
  }[]
  // get_group_ignore_add_request: {}
  set_qq_avatar: {}
  // get_config: {}
  // set_config: {}
  // debug: any
  get_file: {
    file: string
    url: string
    file_size: string
    file_name: string
    base64: string
  }
  forward_friend_single_msg: {}
  forward_group_single_msg: {}
  translate_en2zh: string[]
  get_group_file_count: {
    count: number
  }
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
  set_group_file_folder: {
    result: {
      retCode: 0
      retMsg: 'ok'
      clientWording: string
    }
    groupItem: {
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
  }
  del_group_file: {
    result: 0
    errMsg: 'ok'
    transGroupFileResult: {
      result: {
        retCode: number
        retMsg: string
        clientWording: string
      }
      successFileIdList: string[]
      failFileIdList: string[]
    }
  }
  del_group_file_folder: {
    retCode: 0
    retMsg: 'ok'
    clientWording: ''
  }
  // set_restart: {}
  send_like: {}
  get_login_info: { user_id: number; nickname: string }
  get_friend_list: {
    qid: string
    longNick: string
    birthday_year: number
    birthday_month: number
    birthday_day: number
    age: number
    sex: 'unknown' | 'male' | 'female'
    eMail: string
    phoneNum: string
    categoryId: number
    richTime: number
    richBuffer: { [key: string]: number }
    uid: string
    uin: string
    nick: string
    remark: string
    user_id: number
    nickname: string
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
    post_type: 'message' | 'message_sent'
  } & MessageType
  send_msg: {
    message_id: number
  }
  send_group_msg: {
    message_id: number
  }
  send_private_msg: {
    message_id: number
  }
  delete_msg: {}
  set_msg_emoji_like: {
    result: 0
    errMsg: ''
  }
  set_group_add_request: {}
  set_friend_add_request: {}
  set_group_leave: {}
  get_version_info: {
    app_name: 'NapCat.Onebot'
    protocol_version: 'v11'
    app_version: string
  }
  get_status: {
    online: boolean
    good: true
    stat: {}
  }
  can_send_record: { yes: true }
  can_send_image: { yes: true }
  set_group_kick: {}
  set_group_ban: {}
  set_group_whole_ban: {}
  set_group_admin: {}
  set_group_card: {}
  set_group_name: {}
  get_image: {
    file: string
    url: string
    file_size: string
    file_name: string
    base64: string
  }
  get_record: {
    file: string
    url: string
    file_size: string
    file_name: string
    base64: string
  }
  // clean_cache: {}
  get_cookies: {
    cookies: string
    bkn: string
  }
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
      description: string
      day_count: number
      nickname: string
    }[]
    performer_list: {
      user_id: number
      avatar: string
      description: string
      day_count: number
      nickname: string
    }[]
    legend_list: {
      user_id: number
      avatar: string
      description: string
      day_count: number
      nickname: string
    }[]
    emotion_list: {
      user_id: number
      avatar: string
      description: string
      day_count: number
      nickname: string
    }[]
    strong_newbie_list: {
      user_id: number
      avatar: string
      description: string
      day_count: number
      nickname: string
    }[]
  }
  get_essence_msg_list: {
    msg_seq: number
    msg_random: number
    sender_id: number
    sender_nick: string
    operator_id: number
    operator_nick: string
    message_id: number
    operator_time: number
    content: Receive[keyof Receive][]
  }[]
  _send_group_notice: {}
  _get_group_notice: {
    notice_id: string
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
    result: 0
    errMsg: 'success'
    detail: {
      uid: string
      uin: string
      simpleInfo: {
        uid: string
        uin: string
        coreInfo: {
          uid: string
          uin: string
          nick: string
          remark: string
        }
        baseInfo: {
          qid: string
          longNick: string
          birthday_year: number
          birthday_month: number
          birthday_day: number
          age: number
          sex: number
          eMail: string
          phoneNum: string
          categoryId: number
          richTime: number
          richBuffer: { [key: string]: number }
        }
        status: {
          uid: string
          uin: string
          status: number
          extStatus: number
          batteryStatus: number
          termType: number
          netType: number
          iconType: number
          customStatus: null
          setTime: string
          specialFlag: number
          abiFlag: number
          eNetworkType: number
          showName: string
          termDesc: string
          musicInfo: { buf: {} }
          extOnlineBusinessInfo: {
            buf: {}
            customStatus: null
            videoBizInfo: {
              cid: string
              tvUrl: string
              synchType: string
            }
            videoInfo: {
              name: string
            }
          }
          extBuffer: { buf: {} }
        }
        vasInfo: {
          vipFlag: false
          yearVipFlag: false
          svipFlag: false
          vipLevel: number
          bigClub: false
          bigClubLevel: number
          nameplateVipType: number
          grayNameplateFlag: number
          superVipTemplateId: number
          diyFontId: number
          pendantId: number
          pendantDiyId: number
          faceId: number
          vipFont: number
          vipFontType: number
          magicFont: number
          fontEffect: number
          newLoverDiamondFlag: number
          extendNameplateId: number
          diyNameplateIDs: []
          vipStartFlag: number
          vipDataFlag: number
          gameNameplateId: string
          gameLastLoginTime: string
          gameRank: number
          gameIconShowFlag: false
          gameCardId: string
          vipNameColorId: string
          privilegeIcon: null
        }
        relationFlags: {
          topTime: string
          isBlock: false
          isMsgDisturb: false
          isSpecialCareOpen: false
          isSpecialCareZone: false
          ringId: string
          isBlocked: false
          recommendImgFlag: number
          disableEmojiShortCuts: number
          qidianMasterFlag: number
          qidianCrewFlag: number
          qidianCrewFlag2: number
          isHideQQLevel: number
          isHidePrivilegeIcon: number
        }
        otherFlags: {
          onlyChat: false
          qzoneNotWatch: false
          qzoneNotWatched: false
          isZPlanCoupleOpen: false
          zplanCoupleSceneId: number
          teenagerFlag: number
          studyFlag: number
          isAioShortcutBarOpen: false
          colorRindId: number
          isSharingLocation: false
        }
        intimate: null
      }
      commonExt: {
        constellation: number
        shengXiao: number
        kBloodType: number
        homeTown: string
        makeFriendCareer: number
        pos: string
        college: string
        country: string
        province: string
        city: string
        postCode: string
        address: string
        regTime: number
        interest: string
        labels: []
        qqLevel: {
          crownNum: number
          sunNum: number
          moonNum: number
          starNum: number
        }
      }
      photoWall: null
    }
    uid: string
    uin: string
    nick: string
    remark: string
    status: number
    extStatus: number
    batteryStatus: number
    termType: number
    netType: number
    iconType: number
    customStatus: null
    setTime: string
    specialFlag: number
    abiFlag: number
    eNetworkType: number
    showName: string
    termDesc: string
    musicInfo: { buf: {} }
    extOnlineBusinessInfo: {
      buf: {}
      customStatus: null
      videoBizInfo: {
        cid: string
        tvUrl: string
        synchType: string
      }
      videoInfo: {
        name: string
      }
    }
    extBuffer: { buf: {} }
    vipFlag: false
    yearVipFlag: false
    svipFlag: false
    vipLevel: number
    bigClub: false
    bigClubLevel: number
    nameplateVipType: number
    grayNameplateFlag: number
    superVipTemplateId: number
    diyFontId: number
    pendantId: string
    pendantDiyId: number
    faceId: number
    vipFont: number
    vipFontType: number
    magicFont: number
    fontEffect: number
    newLoverDiamondFlag: number
    extendNameplateId: number
    diyNameplateIDs: []
    vipStartFlag: number
    vipDataFlag: number
    gameNameplateId: string
    gameLastLoginTime: string
    gameRank: number
    gameIconShowFlag: false
    gameCardId: string
    vipNameColorId: string
    privilegeIcon: null
    qid: string
    longNick: string
    birthday_year: number
    birthday_month: number
    birthday_day: number
    age: number
    sex: string
    eMail: string
    phoneNum: string
    categoryId: number
    richTime: number
    richBuffer: { [key: string]: number }
    user_id: number
    nickname: string
    login_days: number
    level: number
  }
  mark_msg_as_read: {}
  // get_guild_list: {}
  mark_private_msg_as_read: {}
  mark_group_msg_as_read: {}
  upload_group_file: {}
  delete_group_file: WSSendReturn['del_group_file']
  create_group_file_folder: WSSendReturn['set_group_file_folder']
  delete_group_file_folder: WSSendReturn['del_group_file_folder']
  get_group_file_system_info: {
    file_count: number
    limit_count: number
    used_space: number
    total_space: number
  }
  get_group_root_files: {
    files: {
      group_id: number
      file_id: string
      file_name: string
      busid: number
      size: number
      upload_time: number
      dead_time: number
      modify_time: number
      download_times: number
      uploader: number
      uploader_name: string
    }[]
    folders: {
      group_id: number
      folder_id: string
      folder_name: string
      create_time: number
      creator: number
      creator_name: string
      total_file_count: number
    }[]
  }
  get_group_files_by_folder: WSSendReturn['get_group_root_files']
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
      post_type: 'message' | 'message_sent'
    } & MessageType)[]
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
      post_type: 'message' | 'message_sent'
    } & MessageType)[]
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
      post_type: 'message' | 'message_sent'
    } & MessageType)[]
  }
  get_group_ignored_notifies: {
    join_requests: {
      request_id: number
      requester_uin: number
      requester_nick: string
      group_id: number
      group_name: string
      checked: boolean
      actor: number
    }[]
  }
  // get_online_clients: { app_id: string; device_name: string; device_kind: string }[]
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
  set_self_profile: { result: 0; errMsg: '' }
  create_collection: {}
  get_collection_list: any
  set_self_longnick: { result: 0; errMsg: '' }
  set_essence_msg: { errCode: 0; errMsg: 'success' }
  delete_essence_msg: { errCode: 0; errMsg: 'success' }
  get_recent_contact: {
    lastestMsg: (
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
      raw_message: string
      font: number
      post_type: 'message_sent' | 'message'
    } & MessageType
    peerUin: string
    remark: string
    msgTime: string
    chatType: number
    msgId: string
    sendNickName: string
    sendMemberName: string
    peerName: string
  }[]
  _mark_all_as_read: {}
  get_profile_like: {
    uid: string
    src: number
    latestTime: number
    count: number
    giftCount: number
    customId: number
    lastCharged: number
    bAvailableCnt: number
    bTodayVotedCnt: number
    nick: string
    gender: number
    age: number
    isFriend: boolean
    isvip: boolean
    isSvip: boolean
    uin: number
  }[]
  set_group_portrait: {
    result: 0
    errMsg: 'success'
  }
  fetch_custom_face: string[]
  upload_private_file: {}
  fetch_emoji_like: {
    result: number
    errMsg: string
    emojiLikesList: {
      tinyId: string
      nickName: string
      headUrl: string
    }[]
    cookie: string
    isLastPage: boolean
    isFirstPage: boolean
  }
  // test_api_01: {}
  // get_guild_service_profile: {}
  // _set_model_show: {}
  set_input_status: {}
  // get_csrf_token: {}
  _del_group_notice: {}
  get_group_info_ex: {
    groupCode: string
    resultCode: number
    extInfo: {
      groupInfoExtSeq: number
      reserve: number
      luckyWordId: string
      lightCharNum: number
      luckyWord: string
      starId: number
      essentialMsgSwitch: number
      todoSeq: number
      blacklistExpireTime: number
      isLimitGroupRtc: number
      companyId: number
      hasGroupCustomPortrait: number
      bindGuildId: string
      groupOwnerId: {
        memberUin: string
        memberUid: string
        memberQid: string
      }
      essentialMsgPrivilege: number
      msgEventSeq: string
      inviteRobotSwitch: number
      gangUpId: string
      qqMusicMedalSwitch: number
      showPlayTogetherSwitch: number
      groupFlagPro1: string
      groupBindGuildIds: { guildIds: string[] }
      viewedMsgDisappearTime: string
      groupExtFlameData: {
        switchState: number
        state: number
        dayNums: string[]
        version: number
        updateTime: string
        isDisplayDayNum: false
      }
      groupBindGuildSwitch: number
      groupAioBindGuildId: string
      groupExcludeGuildIds: { guildIds: string[] }
      fullGroupExpansionSwitch: number
      fullGroupExpansionSeq: string
      inviteRobotMemberSwitch: number
      inviteRobotMemberExamine: number
      groupSquareSwitch: number
    }
  }
  get_group_system_msg: {
    InvitedRequest: {
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
      invitor_uin: number
      invitor_nick: string
      group_id: number
      group_name: string
      checked: boolean
      actor: number
    }[]
  }
}
