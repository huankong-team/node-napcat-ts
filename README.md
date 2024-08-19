# node-napcat-ts

对于 `CQCode` 兼容性不会做保证,请尽快迁移到 `消息段` !!!

## 使用

### 安装

```bash
pnpm i node-napcat-ts
```

### 开始使用

```typescript
import { NCWebsocket } from 'node-napcat-ts'

const napcat = new NCWebsocket({
  baseUrl: 'https://napcat.nnt.moe',
  accessToken: 'your token',
})

// or
// const napcat = new NCWebsocket({
//   protocol: 'wss',
//   host: 'napcat.nnt.moe',
//   port: 443,
//   accessToken: 'your token',
// })

napcat.on('message', (msg) => {
  console.log(msg.message)

  napcat.send('send_msg', { user_id: 123, message: ':D' })
})
```
