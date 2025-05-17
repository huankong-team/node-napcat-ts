# node-napcat-ts 项目文档

## 1. 项目简介

`node-napcat-ts` 是一个使用 TypeScript 编写的 SDK，用于连接和与 [NapcatQQ](https://github.com/NapNeko/NapCatQQ) 进行交互。该 SDK 提供了完整的 API 接口类型定义，简化了开发者使用 NapcatQQ 的过程。

当前 SDK 基于 `napcat-v4.5.23` 版本开发。

## 2. 主要特点

- 使用 WebSocket 进行通信
- 完整的 TypeScript 类型支持
- 提供结构体构造器，简化消息创建过程
- 支持事件绑定和处理
- 自动重连功能
- 兼容 OneBot 11 协议

## 3. 快速开始

### 安装

```bash
pnpm add node-napcat-ts
```

> **注意**：node-napcat-ts 是仅 ESM 的软件包，不支持使用 `require()` 导入。确保 package.json 包含 `"type": "module"`，或使用 `.mjs`/`.mts` 文件扩展名。

### 初始化与连接

```typescript
import { NCWebsocket } from 'node-napcat-ts'

// 详细配置方式
const napcat = new NCWebsocket({
  protocol: 'ws',
  host: 'localhost',
  port: 3001,
  accessToken: 'your_token',
  throwPromise: false,
  reconnection: {
    enable: true,
    attempts: 10,
    delay: 5000,
  }
}, false) // 第二个参数为是否开启 DEBUG 模式

// 或使用快速配置方式
const napcat = new NCWebsocket({
  baseUrl: 'ws://localhost:3001',
  accessToken: 'your_token',
  // 其他配置...
})

// 绑定事件
napcat.on('socket.open', function(res) {
  console.log(`连接成功#${res.reconnection.nowAttempts}`)
})

// 连接
await napcat.connect()
```

## 4. 事件绑定

事件绑定是 node-napcat-ts 的核心功能之一，推荐在调用 `connect` 方法前注册事件处理函数。

```typescript
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
```

### 快捷操作

对于 message 和 request 事件，SDK 提供了快捷操作功能：

```typescript
napcat.on('message', async (context) => {
  await context.quick_action([Structs.text('233')])
})
```

### 主要事件类型

- `socket` 相关事件：`socket.connecting`、`socket.open`、`socket.close`、`socket.error`
- `message` 相关事件：接收消息、发送消息等
- `notice` 相关事件：群通知、好友通知等
- `request` 相关事件：好友请求、群组邀请等
- `meta_event` 相关事件：生命周期、心跳包等

## 5. 调用 API

SDK 提供了丰富的 API 接口，可以直接在实例化对象上调用：

```typescript
import { Structs } from 'node-napcat-ts'

// 发送消息
await napcat.send_msg({
  user_id: 10001,
  message: [Structs.text('你好呀~')]
})
```

## 6. API 分类

根据注释标记，API 可以分为以下几类：

### @onebot11

遵循 OneBot 11 协议标准的 API，例如：

- `send_private_msg` - 发送私聊消息
- `send_group_msg` - 发送群聊消息
- `get_login_info` - 获取登录信息
- `set_group_kick` - 群组踢人

### @gocqhttp

与 go-cqhttp 兼容的 API，例如：

- `set_qq_profile` - 设置 QQ 资料
- `get_group_msg_history` - 获取群聊历史消息
- `ocr_image` - OCR 图片
- `set_essence_msg` - 设置精华消息

### @napcat

NapcatQQ 特有的 API，例如：

- `mark_private_msg_as_read` - 标记私聊已读
- `mark_group_msg_as_read` - 标记群聊已读
- `get_friend_msg_history` - 获取私聊历史记录
- `get_ai_record` - 获取 AI 记录
- `get_ai_characters` - 获取 AI 角色列表

## 7. 结构体构造器

SDK 提供了 `Structs` 对象，用于方便地构造各种消息结构体：

```typescript
import { Structs } from 'node-napcat-ts'

await napcat.send_msg({
  user_id: 10001,
  message: [
    Structs.text('123'), // {"type":"text","data":{"text":"123"}}
    Structs.at(10001), // {"type":"at","data":{"qq":"10001"}}
    Structs.reply(1111111111), // {"type":"reply","data":{"id":"1111111111"}}
    Structs.image('https://baidu.com', 'name.jpg'), // {"type":"image","data":{"file":"https://baidu.com","name":"name.jpg"}}
  ],
})
```

## 8. 实用功能

### 自动重连

SDK 提供了自动重连功能，可以通过配置启用：

```typescript
const napcat = new NCWebsocket({
  // ...其他配置
  reconnection: {
    enable: true,    // 是否启用自动重连
    attempts: 10,    // 最大重连尝试次数
    delay: 5000,     // 重连延迟（毫秒）
  }
})
```

### 断开和重新连接

```typescript
// 断开连接
napcat.disconnect()

// 重新连接
await napcat.reconnect()
```

## 9. 类型定义

SDK 提供了全面的 TypeScript 类型定义，包括但不限于：

- `MessageHandler` - 消息处理程序的类型
- `NoticeHandler` - 通知处理程序的类型
- `RequestHandler` - 请求处理程序的类型
- `WSSendParam` - API 发送参数的类型
- `WSSendReturn` - API 返回值的类型

## 10. 相关文档

- [NapCat 文档](https://napneko.github.io/) - NapcatQQ 官方文档
- [node-napcat-ts 文档](https://node-napcat-ts.huankong.top) - 本 SDK 的官方文档
- [go-cqhttp 文档](https://docs.go-cqhttp.org/) - go-cqhttp 的官方文档
- [onebot11 文档](https://github.com/botuniverse/onebot-11/) - OneBot 11 协议文档

## 11. 更新历史

SDK 维护了完善的更新日志，记录了各个版本的变更和改进。最新版本是 v0.4.11（2025-05-02），主要调整了 Send 类型。

详细更新日志请参考项目的 CHANGELOG.md 文件。

## 12. 项目贡献

如发现接口缺少或类型错误，欢迎提交 [PR](https://github.com/huankong233/node-napcat-ts/compare)。

---

文档基于 node-napcat-ts（截至 2025-05-17）整理。