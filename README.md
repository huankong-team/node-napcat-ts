# node-napcat-ts

对于 `CQCode` 兼容性不会做保证,请尽快迁移到 `消息段` !!!

## 使用

### 安装

```bash
pnpm i node-napcat-ts
```

### 开始使用

```typescript
import { NCWebsocket } from "node-napcat-ts"

// 初始化
const napcat = new NCWebsocket({
  baseUrl: "https://napcat.nnt.moe",
  accessToken: "your token",
})

// or
// const napcat = new NCWebsocket({
//   protocol: 'wss',
//   host: 'napcat.nnt.moe',
//   port: 443,
//   accessToken: 'your token',
// })

// 监听事件
napcat.on("message", (msg) => {
  console.log(msg.message)
  // 发送请求
  napcat.send_msg({ user_id: 123, message: ":D" })
})
```

## 文档

有关部分:

- `napcat` 的 [文档](https://napneko.github.io/zh-CN)
- `go-cqhttp` 的 [文档](https://docs.go-cqhttp.org)
- `onebot11` 的 [文档](https://github.com/botuniverse/onebot-11)

### 事件

可用 `on` 监听到的相关事件

- `on` 注册监听方法
- `once` 只执行一次
- `off` 取消监听
- `emit` 手动模拟触发某个事件

#### socket 事件

连接 `websocket` 服务的事件

| 事件名              | 说明                     |
| ------------------- | ------------------------ |
| `socket`            | 以下子事件都会触发该事件 |
| `socket.connecting` |                          |
| `socket.open`       |                          |
| `socket.close`      |                          |
| `socket.error`      |                          |

#### api 事件

发送接口请求的事件

| 事件名                 | 说明                     |
| ---------------------- | ------------------------ |
| `api`                  | 以下子事件都会触发该事件 |
| `api.preSend`          |                          |
| `api.response`         |                          |
| `api.response.success` |                          |
| `api.response.failure` |                          |

#### message 事件

收到消息的事件

| 事件名            | 说明                     |
| ----------------- | ------------------------ |
| `message`         | 以下子事件都会触发该事件 |
| `message.private` | 私聊消息                 |
| `message.group`   | 群消息                   |

#### message_sent 事件

自己发送的消息的事件

| 事件名                 | 说明                     |
| ---------------------- | ------------------------ |
| `message_sent`         | 以下子事件都会触发该事件 |
| `message_sent.private` |                          |
| `message_sent.group`   |                          |

#### meta_event 事件

元事件

| 事件名                 | 说明                     |
| ---------------------- | ------------------------ |
| `meta_event`           | 以下子事件都会触发该事件 |
| `meta_event.lifecycle` | 生命周期                 |
| `meta_event.heartbeat` | 心跳                     |

#### request 事件

收到的请求事件

| 事件名           | 说明                     |
| ---------------- | ------------------------ |
| `request`        | 以下子事件都会触发该事件 |
| `request.friend` | 加好友请求               |
| `request.group`  | 加群请求                 |

#### notice 事件

收到的通知事件

| 事件名                        | 说明                     |
| ----------------------------- | ------------------------ |
| `notice`                      | 以下子事件都会触发该事件 |
| `notice.friend_recall`        | 好友消息撤回             |
| `notice.group_recall`         | 群消息撤回               |
| `notice.group_increase`       | 群成员增加               |
| `notice.group_decrease`       | 群成员减少               |
| `notice.group_admin`          | 群管理员变动             |
| `notice.group_upload`         | 群文件上传               |
| `notice.group_ban`            | 群禁言                   |
| `notice.friend_add`           | 好友添加                 |
| `notice.notify`               |                          |
| `notice.notify.poke.friend`   | 好友戳一戳               |
| `notice.notify.poke.group`    | 群内戳一戳               |
| `notice.notify.title`         |                          |
| `notice.group_card`           | 群名片变更               |
| `notice.group_msg_emoji_like` |                          |

### API

#### 可用方法

##### napcat扩展接口

| 方法名                      | 说明               |
| --------------------------- | ------------------ |
| `ArkShareGroup`             | 推荐联系人/群聊    |
| `ArkSharePeer`              | 推荐群聊           |
| `reboot_normal`             | 无快速登录重新启动 |
| `get_robot_uin_range`       | 获取机器人QQ号     |
| `set_online_status`         | 设置状态           |
| `get_friends_with_category` | 获取好友分类列表   |
| `set_qq_avatar`             | 设置头像           |
| `debug`                     |                    |
| `get_file`                  | 获取文件           |
| `forward_friend_single_msg` | 转发私聊           |
| `forward_group_single_msg`  | 转发群聊           |
| `translate_en2zh`           | 翻译               |
| `get_group_file_count`      | 获取群文件数       |
| `get_group_file_list`       | 获取群文件列表     |
| `set_group_file_folder`     | 新建群文件文件夹   |
| `del_group_file`            | 删除群文件文件     |
| `del_group_file_folder`     | 删除群文件文件夹   |

##### ontbot11接口

| 方法名                   | 说明                 |
| ------------------------ | -------------------- |
| `send_like`              | 点赞                 |
| `get_login_info`         | 获取登录号信息       |
| `get_friend_list`        | 获取好友列表         |
| `get_group_info`         | 获取群信息           |
| `get_group_list`         | 获取群列表           |
| `get_group_member_info`  | 获取群成员信息       |
| `get_group_member_list`  | 获取群成员列表       |
| `get_msg`                | 获取消息             |
| `send_msg`               | 发送消息             |
| `send_group_msg`         | 发送群聊消息         |
| `send_private_msg`       | 发送私聊消息         |
| `delete_msg`             | 撤回消息             |
| `set_msg_emoji_like`     | 设置消息的表情回复   |
| `set_group_add_request`  | 处理加群请求/邀请    |
| `set_friend_add_request` | 处理加好友请求       |
| `set_group_leave`        | 退出群组             |
| `get_version_info`       | 获取版本信息         |
| `get_status`             | 获取状态             |
| `can_send_record`        | 检查是否可以发送语音 |
| `can_send_image`         | 检查是否可以发送图片 |
| `set_group_kick`         | 群组踢人             |
| `set_group_ban`          | 群单人禁言           |
| `set_group_whole_ban`    | 群全员禁言           |
| `set_group_admin`        | 设置群管理员         |
| `set_group_card`         | 设置群名片(群备注)   |
| `set_group_name`         | 设置群名             |
| `get_image`              | 获取图片信息         |
| `get_record`             | 获取语音             |
| `clean_cache`            | 清理缓存             |
| `get_cookies`            | 获取 Cookies         |

##### go-cqhttp接口

| 方法名                     | 说明                         |
| -------------------------- | ---------------------------- |
| `.handle_quick_operation`  | 对事件执行快速操作(隐藏 API) |
| `get_group_honor_info`     | 获取群荣誉信息               |
| `get_essence_msg_list`     | 获取精华消息列表             |
| `_send_group_notice`       | 发送群公告                   |
| `_get_group_notice`        | 获取群公告                   |
| `send_forward_msg`         | 发送合并转发                 |
| `send_group_forward_msg`   | 发送合并转发(群聊)           |
| `send_private_forward_msg` | 发送合并转发(好友)           |
| `get_stranger_info`        | 获取陌生人信息               |
| `mark_msg_as_read`         | 标记消息已读                 |
| `mark_private_msg_as_read` |                              |
| `mark_group_msg_as_read`   |                              |
| `upload_group_file`        | 上传群文件                   |
| `download_file`            | 下载文件到缓存目录           |
| `get_group_msg_history`    | 获取群消息历史记录           |
| `get_forward_msg`          | 获取合并转发内容             |
| `get_friend_msg_history`   | 获取私聊记录                 |
| `get_group_system_msg`     | 获取群系统消息               |
| `get_online_clients`       | 获取当前账号在线客户端列表   |
| `ocr_image`                | 图片 OCR                     |
| `set_self_profile`         | 设置个人资料                 |
| `create_collection`        |                              |
| `get_collection_list`      |                              |
| `set_self_longnick`        | 设置个人签名                 |
| `set_essence_msg`          | 设精🤪(设置消息为精华消息)    |
| `delete_essence_msg`       | 取消设精                     |
| `get_recent_contact`       | 获取最近的聊天记录           |
| `_mark_all_as_read`        | 标记所有为已读               |
| `get_profile_like`         |                              |
| `set_group_head`           | 设置群头像                   |
| `fetch_custom_face`        | 获取收藏表情                 |
| `upload_private_file`      | 上传私聊文件                 |
| `fetch_emoji_like`         |                              |
| `set_input_status`         | 设置输入状态                 |

### 消息段构建器

示例:

```typescript
import { Structs } from 'node-napcat-ts'

//....

napcat.send_msg({
  user_id: 10001,
  message: [
    Structs.text('123'),
    Structs.at(1111111111),
    Structs.reply(1111111111),
    Structs.image('https://baidu.com','name.jgp')
  ]
})
```

| 方法名     |
| ---------- |
| `text`     |
| `at`       |
| `reply`    |
| `face`     |
| `mface`    |
| `image`    |
| `file`     |
| `video`    |
| `miniapp`  |
| `record`   |
| `json`     |
| `dice`     |
| `rps`      |
| `markdown` |
| `music`    |
| `node`     |
