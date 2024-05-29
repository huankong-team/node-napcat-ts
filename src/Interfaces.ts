export interface CQWebsocketOptionsBaseUrl {
  baseUrl: string
  accessToken?: string
}

export interface CQWebsocketOptionsHost {
  protocol: 'ws' | 'wss'
  host: string
  port: number
  accessToken?: string
}

export type CQWebsocketOptions = CQWebsocketOptionsBaseUrl | CQWebsocketOptionsHost

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

export interface Status {
  // 表示BOT是否在线
  online: boolean
  // 锁定为 true
  good: true
}

// 心跳包
export interface HeartBeat {
  time: number
  self_id: number
  post_type: 'meta_event'
  meta_event_type: 'heartbeat'
  status: Status
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

// 发送者信息
export interface Sender {
  user_id: number
  nickname: string
  card: string
}

export interface SenderGroup extends Sender {
  role: 'owner' | 'admin' | 'member'
}

// 私聊消息
export interface PrivateMessage {
  time: number
  self_id: number
  user_id: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'private'
  sender: Sender
  raw_message: string
  font: number
  sub_type: 'friend'
  message: string
  post_type: 'message'
}

// 群消息
export interface GroupMessage {
  time: number
  self_id: number
  user_id: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'group'
  sender: SenderGroup
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

export interface PrivateMessageSelf {
  time: number
  self_id: number
  user_id: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'private'
  sender: Sender
  raw_message: string
  font: number
  sub_type: 'friend'
  message: string
  post_type: 'message_sent'
}

export interface GroupMessageSelf {
  self_id: number
  user_id: number
  time: number
  message_id: number
  message_seq: number
  real_id: number
  message_type: 'group'
  sender: SenderGroup
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
  operator_id: number
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

export interface Device {
  app_id: number
  device: string
  device_kind: string
}

export interface ClientStatus {
  post_type: 'notice'
  notice_type: 'client_status'
  client: Device
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
  'notice.notify.lucky_king': NotifyLuckyKing
  'notice.notify.honor': NotifyHonor
  'notice.notify.title': NotifyTitle
  'notice.notify': NotifyPokeFriend | NotifyPokeGroup | NotifyLuckyKing | NotifyHonor | NotifyTitle
  'notice.group_card': GroupCard
  'notice.offline_file': OfflineFile
  'notice.client_status': ClientStatus
  'notice.essence': Essence
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
    | NotifyLuckyKing
    | NotifyHonor
    | NotifyTitle
    | GroupCard
    | OfflineFile
    | ClientStatus
    | Essence
}

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
  // ===================================账号部分==============================================
  get_login_info: {}
  // ===================================好友信息==============================================
  get_stranger_info: { user_id: number; no_cache: boolean }
  get_friend_list: {}
  // ===================================好友操作==============================================
  delete_friend: { user_id: number }
  // ===================================消息==============================================
  send_private_msg: { user_id: number; group_id?: number; message: string; auto_escape?: boolean }
  send_group_msg: { group_id: number; message: string; auto_escape?: boolean }
  send_msg: (
    | { message_type: 'private'; user_id: number }
    | { message_type: 'group'; group_id: number }
  ) & {
    message: string
    auto_escape?: boolean
  }
  get_msg: { message_id: number }
  delete_msg: { message_id: number }
  mark_msg_as_read: { message_id: number }
  get_forward_msg: { message_id: string }
  send_group_forward_msg: {
    group_id: number
    // TODO: 替换为 CQNode类
    messages: { type: 'node'; data: { content: string } }[]
  }
  send_private_forward_msg: {
    user_id: number
    // TODO: 替换为 CQNode类
    messages: { type: 'node'; data: { content: string } }[]
  }
  send_forward_msg: ({ group_id: number } | { user_id: number }) & {
    messages: { type: 'node'; data: { content: string } }[]
  }
  get_group_msg_history: { group_id: number; message_seq: number; count: number }
  // ===================================图片==============================================
  get_image: { file: string }
  can_send_image: {}
  ocr_image: { image: string }
  // ===================================语音==============================================
  get_record: { file: string }
  can_send_record: {}
  // ===================================处理==============================================
  set_friend_add_request: { flag: string; approve?: boolean; remark?: string }
  set_group_add_request: {
    flag: string
    sub_type: 'add' | 'invite'
    approve?: boolean
    reason?: string
  }
  // ===================================群信息==============================================
  get_group_info: { group_id: number; no_cache?: boolean }
  get_group_list: { no_cache?: boolean }
  get_group_member_info: { group_id: number; user_id: number; no_cache?: boolean }
  get_group_member_list: { group_id: number; no_cache?: boolean }
  get_group_honor_info: {
    group_id: number
    type: 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion' | 'all'
  }
  get_group_system_msg: {}
  get_essence_msg_list: { group_id: number; pages: number }
}

export interface HonorInfoList {
  user_id: number
  avatar: string
  description: string
  nickname: string
}

export type WSSendReturn = {
  // ===================================账号部分==============================================
  get_login_info: { user_id: number; nickname: string }
  // ===================================好友信息==============================================
  get_stranger_info: {
    user_id: number
    nickname: string
    sex: 'male' | 'female' | 'unknown'
    age: number
    qid: string
    level: number
    login_days: number
  }
  get_friend_list: {
    user_id: number
    nickname: string
    remark: string
  }[]
  // ===================================好友操作==============================================
  delete_friend: {}
  // ===================================消息==============================================
  send_private_msg: { message_id: number }
  send_group_msg: { message_id: number }
  send_msg: { message_id: number }
  get_msg: (
    | { message_type: 'private'; sender: Sender; sub_type: 'friend' }
    | { message_type: 'group'; group_id: number; sender: SenderGroup; sub_type: 'normal' }
  ) & {
    message_id: number
    real_id: number
    message: string
    raw_message: string
  }
  delete_msg: {}
  mark_msg_as_read: {}
  get_forward_msg: {
    messages: ((
      | {
          message_type: 'private'
          sub_type: 'friend'
          sender: Sender
        }
      | {
          message_type: 'group'
          sub_type: 'normal'
          group_id: number
          sender: SenderGroup
        }
    ) & {
      time: number
      user_id: number
      message_id: number
      raw_message: string
      font: number
      post_type: 'message'
      content: string
    })[]
  }
  send_group_forward_msg: { message_id: number }
  send_private_forward_msg: { message_id: number }
  send_forward_msg: { message_id: number }
  get_group_msg_history: {
    messages: ((
      | {
          message_type: 'private'
          sub_type: 'friend'
          sender: Sender
        }
      | {
          message_type: 'group'
          sub_type: 'normal'
          group_id: number
          sender: SenderGroup
        }
    ) & {
      time: number
      user_id: number
      message_id: number
      raw_message: string
      font: number
      post_type: 'message'
      message: string
    })[]
  }
  // ===================================图片==============================================
  get_image: { file: string; url: string; size: string; file_name: string }
  can_send_image: { yes: boolean }
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
  // ===================================语音==============================================
  get_record: {
    file: string
    url: string
    file_size: string
    file_name: string
    base64: string
  }
  can_send_record: { yes: boolean }
  // ===================================处理==============================================
  set_friend_add_request: {}
  set_group_add_request: {}
  // ===================================群信息==============================================
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
    sex: string
    age: number
    area: string
    level: number
    qq_level: number
    join_time: number
    last_sent_time: number
    title_expire_time: number
    unfriendly: boolean
    card_changeable: boolean
    is_robot: boolean
    shut_up_timestamp: number
    role: 'owner' | 'admin' | 'member'
    title: string
  }
  get_group_member_list: {
    group_id: number
    user_id: number
    nickname: string
    card: string
    sex: string
    age: number
    area: string
    level: number
    qq_level: number
    join_time: number
    last_sent_time: number
    title_expire_time: number
    unfriendly: boolean
    card_changeable: boolean
    is_robot: boolean
    shut_up_timestamp: number
    role: 'owner' | 'admin' | 'member'
    title: string
  }[]
  get_group_honor_info: {
    group_id: number
    current_talkative?: {
      user_id: number
      avatar: string
      nickname: string
      day_count: number
      description: string
    }
    talkative_list?: HonorInfoList[]
    performer_list?: HonorInfoList[]
    legend_list?: HonorInfoList[]
    emotion_list?: HonorInfoList[]
    strong_newbie_list?: HonorInfoList[]
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
  get_essence_msg_list: {
    retcode: number
    retmsg: string
    data: {
      msg_list?: {
        group_code: string
        msg_seq: number
        msg_random: number
        sender_uin: string
        sender_nick: string
        sender_time: number
        add_digest_uin: string
        add_digest_nick: string
        add_digest_time: number
        msg_content: { msg_type: number; text: string }[]
        can_be_removed: boolean
      }[]
    }
  }
}
