# 调用接口

我们连接好了 `NapcatQQ` 是时候该 ~~调教~~ 一下她了

大部分接口都可以直接在 `实例化对象` 上直接调用, 比如 发送信息 `send_msg`

此处的 `Structs` 在 [下一篇-结构体构造器](./struct-maker.md) 中有介绍

``` typescript
import { Structs } from 'node-napcat-ts'

await napcat.send_msg({
  user_id: 10001,
  message: [Structs.text('你好呀~')]
})
```

## 接口大全

::: tip 注意
如有缺少或类型错误请提交 [pr](https://github.com/huankong233/node-napcat-ts/compare)
:::

以 [NapCatQQ文档](https://napneko.github.io/zh-CN/develop/compatibility/api) 为准
