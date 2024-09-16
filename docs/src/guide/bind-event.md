# 绑定事件

推荐在调用 `connect` 方法前注册哦~

``` typescript
// 可以多次触发
napcat.on('事件名', (context) => {
  console.log(context)
})

// 只能触发一次
napcat.once('事件名', (context) => {
  console.log(context)
})

// 取消绑定
napcat.off('事件名', (context) => {
  console.log(context)
})

// 手动触发事件(高级方法)
napcat.emit('事件名', context)
```

## 注意事项

虽然这里直接编写函数是有类型的,不过一般我们是分开写的,比如:

``` typescript
napcat.on('message', handler)

//                 ↓ 这里会缺少类型,导致没有提词器等
function handler(context) {
  console.log(context.message)
}

import type { AllHandlers } from 'node-napcat-ts'
//                 ↓ 手动加上,这样就可以拥有完整的类型检查和提词器
function handler(context: AllHandlers['message']) {
  console.log(context.message)
}
```

## 事件名大全

### 总类型

接口类: `AllHandlers`

### socket 事件

接口类: `SocketHandler`

| 事件名              | 说明                     | 类型           |
| ------------------- | ------------------------ | -------------- |
| `socket`            | 以下子事件都会触发该事件 |                |
| `socket.connecting` | 连接中                   | `WSConnecting` |
| `socket.open`       | 连接成功                 | `WSOpenRes`    |
| `socket.close`      | 连接关闭                 | `WSCloseRes`   |
| `socket.error`      | 连接出错                 | `WSErrorRes`   |

### api 事件

接口类: `ApiHandler`

| 事件名                 | 说明                     | 类型                                     |
| ---------------------- | ------------------------ | ---------------------------------------- |
| `api`                  | 以下子事件都会触发该事件 |                                          |
| `api.preSend`          | 请求发送前               | `APIRequest<keyof WSSendParam>`          |
| `api.response`         |                          |                                          |
| `api.response.success` | 请求成功                 | `APISuccessResponse<keyof WSSendReturn>` |
| `api.response.failure` | 请求失败                 | `APIErrorResponse`                       |

### meta_event 事件

接口类: `MetaEventHandler`

| 事件名                 | 说明                     | 类型        |
| ---------------------- | ------------------------ | ----------- |
| `meta_event`           | 以下子事件都会触发该事件 |             |
| `meta_event.lifecycle` | 生命周期                 | `LifeCycle` |
| `meta_event.heartbeat` | 心跳                     | `HeartBeat` |

### message 事件

接口类: `MessageHandler`

| 事件名            | 说明                     | 类型             |
| ----------------- | ------------------------ | ---------------- |
| `message`         | 以下子事件都会触发该事件 |                  |
| `message.private` | 私聊消息                 | `PrivateMessage` |
| `message.group`   | 群聊消息                 | `GroupMessage`   |

### message_sent 事件

接口类: `MessageSentHandler`

| 事件名                 | 说明                     | 类型                 |
| ---------------------- | ------------------------ | -------------------- |
| `message_sent`         | 以下子事件都会触发该事件 |                      |
| `message_sent.private` | 私聊消息                 | `PrivateMessageSelf` |
| `message_sent.group`   | 群聊消息                 | `GroupMessageSelf`   |

### request 事件

接口类: `RequestHandler`

| 事件名           | 说明                     | 类型            |
| ---------------- | ------------------------ | --------------- |
| `request`        | 以下子事件都会触发该事件 |                 |
| `request.friend` | 加好友请求               | `RequestFriend` |
| `request.group`  | 加群请求                 | `RequestGroup`  |

### notice 事件

接口类: `NoticeHandler`

| 事件名                              | 说明                     | 类型                      |
| ----------------------------------- | ------------------------ | ------------------------- |
| `notice`                            | 以下子事件都会触发该事件 |                           |
| `notice.friend_recall`              | 私聊消息撤回             | `FriendRecall`            |
| `notice.group_recall`               | 群聊消息撤回             | `GroupRecall`             |
| `notice.group_increase`             | 群聊成员增加             | `GroupIncrease`           |
| `notice.group_decrease`             | 群聊成员减少             | `GroupDecrease`           |
| `notice.group_admin`                | 群聊管理员变动           | `GroupAdmin`              |
| `notice.group_upload`               | 群聊文件上传             | `GroupUpload`             |
| `notice.group_ban`                  | 群聊禁言                 | `GroupBan`                |
| `notice.friend_add`                 | 好友添加                 | `FriendAdd`               |
| `notice.notify`                     |                          |                           |
| `notice.notify.input_status`        | 输入状态                 |                           |
| `notice.notify.input_status.friend` | 私聊输入状态             | `NotifyInputStatusFriend` |
| `notice.notify.input_status.group`  | 群聊输入状态             | `NotifyInputStatusGroup`  |
| `notice.notify.poke`                | 戳一戳                   |                           |
| `notice.notify.poke.friend`         | 私聊戳一戳               | `NotifyPokeFriend`        |
| `notice.notify.poke.group`          | 群聊戳一戳               | `NotifyPokeGroup`         |
| `notice.essence`                    | 群聊设精(设置精华)       | `Essence`                 |
| `notice.group_msg_emoji_like`       | 群聊表情回应             | `GroupMsgEmojiLike`       |
