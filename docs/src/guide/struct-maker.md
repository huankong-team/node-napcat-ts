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

::: tip 注意
如有缺少或类型错误请提交 [pr](https://github.com/huankong233/node-napcat-ts/compare)
:::

以 [NapCatQQ文档](https://napneko.com/develop/msg) 为准
