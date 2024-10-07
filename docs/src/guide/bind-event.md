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

//            ↓ 还能单独导入SocketHandlers等
import type { AllHandlers } from 'node-napcat-ts'
//                 ↓ 手动加上,这样就可以拥有完整的类型检查和提词器
function handler(context: AllHandlers['message']) {
  console.log(context.message)
}
```

## 事件名大全

::: tip 注意
如有缺少或类型错误请提交 [pr](https://github.com/huankong233/node-napcat-ts/compare)
:::

以 [NapCatQQ文档](https://napneko.github.io/zh-CN/develop/compatibility/event) 为准

::: tip 注意
使用父类可以被子类触发

比如:

`message` 可以被 `message.private` 触发
:::
