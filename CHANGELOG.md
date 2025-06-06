# 更新日志

## 2025

### 05-20 v0.4.13

- [*] 修正拼接错误 @PullAndRun

### 05-20 v0.4.12

- [*] 优化 JSON 解析逻辑 @Topfunplus

### 05-02 v0.4.11

- [*] 调整 Send 类型 @kanocence

### 04-14 v0.4.10

- [*] 修复获取群成员列表返回的数据结构错误 @wm123450405

### 03-11 v0.4.9

- [*] 修复 `EventBus` 缺失的事件

### 02-28 v0.4.8

- [*] 修复两个参数错误

### 02-27 v0.4.7

- [-] 去除 `Struct.face` 的两个参数

### 02-21 v0.4.6

- [*] 有一个接口写错名字了

### 02-21 v0.4.5

- [*] 全面重构更新

### 02-19 v0.4.4

- [*] 修复错误的类型

### 02-02 v0.4.3

- [*] 修复 Api 上缺少的接口

### 01-10 v0.4.2

- [+] 添加缺少的接口

## 2024

### 11-30 v0.4.1

- [*] 修复错误的类型

### 11-16 v0.4.0

- [+] 添加缺少的接口

### 10-23 v0.3.8

- [*] 修正错误的接口信息

### 10-22 v0.3.7

- [*] 修正结构体数据

### 10-22 v0.3.6

- [*] 修复无需参数的接口依然需要传入参数

### 10-22 v0.3.5

- [*] 重构所有接口

### 10-21 v0.3.4

- [+] 补全接口

### 10-21 v0.3.3

- [*] 补全接口

### 10-21 v0.3.2

- [*] 修复文档错误的样式

### 10-08 v0.3.2

- [+] 增加快捷操作

### 10-07 v0.3.1

- [*] 追平最新版 `NapCat`

### 09-27 v0.3.0

- [*] 更新依赖
- [*] 修改自行编写 `events` 来替换 `mitt` @YunYouJun
- [*] 更新接口
- [*] 优化 `bun` 兼容性

### 09-25 v0.2.22

- [*] 使用 `mitt` 替换 `node:events` 来尝试兼容 `bun` 或其他引擎

### 09-21 v0.2.21

- [*] 优化报错处理
- [+] 增加 `throwPromise` 配置项

### 09-21 v0.2.20

- [*] `connect` 函数修改为异步 @YunYouJun
- [-] 移除 `connect` 函数的 `reject` 部分, 继续沿用 `socket.error` 事件 (会影响到自动重连)
- [*] 更新文档

### 09-20 v0.2.19

- [*] 文件相关结构体支持传入 Buffer @DawningW

### 09-20 v0.2.18

- [*] 优化文档描述

### 09-17 v0.2.18

- [+] 增加一个接口

### 09-17 v0.2.17

- [*] 分割测试文件 @YunYouJun
- [+] 增加接口功能介绍 @YunYouJun
- [*] 修正错误的接口名 @YunYouJun
- [*] 迁移文档到同一仓库

### 09-10 v0.2.16

- [+] 增加一个新接口

### 09-09 v0.2.15

- [*] 修正链接端点

### 09-09 v0.2.14

- [+] `Video` `Record` `Image` `File` 增加两个字段

### 09-08 v0.2.13

- [*] 优化 `socket.error` 处理

### 09-08 v0.2.12

- [*] 修复自动重连
- [*] 修复连接地址为 `ip` 时的错误

### 09-07 v0.2.11

- [+] 支持判断 `access_token` 是否错误

### 09-03 v0.2.10

- [*] 修复接口名称错误

### 09-02 v0.2.9

- [*] 修改 `uuid` 生成方案

### 09-01 v0.2.8

- [*] 同步最新版 `napcat` 修改
- [*] 补全大量接口信息
- [*] 更新依赖

### 08-29 v0.2.7

- [*] 同步最新版 `napcat` 修改
- [*] 废弃发送消息可以用 `string`

### 08-27 v0.2.6

- [*] 修复 `socket` 事件的类型错误

### 08-27 v0.2.5

- [*] 优化消息段构造器参数灵活性

### 08-26 v0.2.4

- [+] 增加输入状态事件

### 08-26 v0.2.3

- [*] 修复连接错误时错误的类型

### 08-26 v0.2.2

- [*] 尝试修复无法在浏览器环境中使用

### 08-25 v0.2.1

- [*] 补全缺失的接口/事件数据

### 08-24 v0.2.0

- [*] 重构标准化功能(ontbot11)
- [*] 优化消息段构造器,感谢 @jacksixth

### 08-23 v0.1.10

- [*] 尝试修复无法在浏览器环境中使用

### 08-23 v0.1.9

- [*] 修正错误的文本

### 08-20 v0.1.8

- [*] 修复自动解码错误

### 08-20 v0.1.7

- [*] 自动解码 `raw_message`

### 08-19 v0.1.6

- [+] 新增文档,感谢 @jacksixth
- [+] 补全缺少的接口

### 08-19 v0.1.5

- [*] 优化 `CQCode` 转换
- [*] 优化 `CQCode` 处理
- [+] 增加自动重连
- [*] 合并 `/api` `/event` 接口
- [*] 更改消息段构造器调用名称

### 07-20 v0.1.4

- [*] 修复部分类型错误
- [*] 修复对消息错误的编码

### 07-11 v0.1.3

- [*] 修复部分类型错误
- [+] 增加对结构体形式的支持

### 06-13 v0.1.2

- [*] 修复转换 `CQCode` 为 `JSON` 错误的类型

### 06-13 v0.1.1

- [+] 增加自动编码

### 06-11 v0.1.0

- [*] 同步 `NapCatV1.5.4`
- [*] 补全 `CQTag` 生成和类型

### 06-07 v0.0.10

- [*] 修正错误的字段名

### 06-06 v0.0.9

- [*] 修改 `auto_escape` 为可选

### 06-06 v0.0.8

- [+] 补全缺少的参数

### 06-05 v0.0.7

- [+] 同步 `NapCatV1.5.2`

### 06-05 v0.0.6

- [*] 同步所有接口参数以返回值

### 05-31 v0.0.5

- [*] 修正 `no_cache` 非必传

### 05-31 v0.0.4

- [-] 去除部分非必要接口传参

### 05-31 v0.0.3

- [*] 修复接口调用锁死

### 05-31 v0.0.2

- [+] 补全导出

### 05-30 v0.0.1

- [+] 完成接口请求部分
- [+] 完成 CQ 码转换
