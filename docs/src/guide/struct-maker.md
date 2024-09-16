# 结构体构造器

::: tip 碎碎念
虽然按照标准来说所有字段都是字符串,不过编写起来不方便,所以传入数字也可以, 会自动转换类型保证兼容性
:::

```typescript
import { Structs } from 'node-napcat-ts'

await napcat.send_msg({
  user_id: 10001,
  message: [
    Structs.text('123'), // {"type":"text","data":{"text":"123"}}
    Structs.at(10001), // {"type":"at","data":{"qq":"10001"}}
    Structs.reply(1111111111), // {"type":"reply","data":{"id":"1111111111"}}
    Structs.image('https://baidu.com','name.jpg') // {"type":"image","data":{"file":"https://baidu.com","name":"name.jpg"}}
  ]
})
```

## 结构体大全

| 方法名        | 说明               |
| ------------- | ------------------ |
| `text`        | 纯文本             |
| `at`          | @某人              |
| `reply`       | 回复消息           |
| `face`        | `qq` 表情          |
| `mface`       | `qq` 表情包        |
| `image`       | 图片               |
| `file`        | 文件               |
| `video`       | 视频               |
| `record`      | 语音               |
| `json`        | `json` 信息        |
| `dice`        | 骰子               |
| `rps`         | 猜拳               |
| `music`       | 音乐分享           |
| `customMusic` | 自定义音乐分享     |
| `node`        | 转发消息节点       |
| `customNode`  | 自定义转发消息节点 |
