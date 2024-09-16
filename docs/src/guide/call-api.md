# 调用接口

我们连接好了 `NapcatQQ` 是时候该 ~~调教~~ 一下她了

大部分接口都可以直接在 `实例化对象` 上直接调用, 比如 发送信息 `send_msg`

此处的 `Structs` 在 [下一篇-结构体构造器](/guide/struct-maker) 中有介绍

``` typescript
import { Structs } from 'node-napcat-ts'

await napcat.send_msg({
  user_id: 10001,
  message: [Structs.text('你好呀~')]
})
```

## 接口大全

### onebot 接口

如果携带 `*` 则为未实现

| 方法名                     | 说明                   |
| -------------------------- | ---------------------- |
| `send_private_msg`         | 发送私聊消息           |
| `send_group_msg`           | 发送群聊消息           |
| `send_msg`                 | 发送消息               |
| `delete_msg`               | 撤回消息               |
| `get_msg`                  | 获取消息               |
| `get_forward_msg`          | 获取合并转发内容       |
| `send_like`                | 点赞                   |
| `set_group_kick`           | 群组踢人               |
| `set_group_ban`            | 群单人禁言             |
| `set_group_whole_ban`      | 群全员禁言             |
| `set_group_admin`          | 设置群管理员           |
| `set_group_card`           | 设置群名片             |
| `set_group_name`           | 设置群名               |
| `set_group_leave`          | 退出群组               |
| `set_group_special_title`* | 设置群聊专属头衔       |
| `set_friend_add_request`   | 处理加好友请求         |
| `set_group_add_request`    | 处理加群请求/邀请      |
| `get_login_info`           | 获取登录号信息         |
| `get_stranger_info`        | 获取陌生人信息         |
| `get_friend_list`          | 获取好友列表           |
| `get_group_info`           | 获取群信息             |
| `get_group_list`           | 获取群列表             |
| `get_group_member_info`    | 获取群成员信息         |
| `get_group_member_list`    | 获取群成员列表         |
| `get_group_honor_info`     | 获取群荣誉信息         |
| `get_cookies`              | 获取 `Cookies`         |
| `get_csrf_token`*          | 获取 `CSRF Token`      |
| `get_credentials`*         | 获取 `QQ` 相关接口凭证 |
| `get_record`               | 获取语音               |
| `get_image`                | 获取图片信息           |
| `can_send_image`           | 检查是否可以发送图片   |
| `can_send_record`          | 检查是否可以发送语音   |
| `get_status`               | 获取状态               |
| `get_version_info`         | 获取版本信息           |
| `set_restart`*             | 重启 `OneBot` 实现     |
| `clean_cache`              | 清理缓存               |

### napcat 扩展接口

| 方法名                      | 说明               |
| --------------------------- | ------------------ |
| `ArkShareGroup`             | 推荐联系人/群聊    |
| `ArkSharePeer`              | 推荐群聊           |
| `get_robot_uin_range`       | 获取机器人QQ号区间 |
| `set_online_status`         | 设置在线状态       |
| `get_friends_with_category` | 获取好友分类列表   |
| `set_qq_avatar`             | 设置头像           |
| `get_file`                  | 获取文件信息       |
| `forward_friend_single_msg` | 转发单条信息到私聊 |
| `forward_group_single_msg`  | 转发单条信息到群聊 |
| `translate_en2zh`           | 英译中翻译         |
| `get_group_file_count`      | 获取群文件数       |
| `get_group_file_list`       | 获取群文件列表     |
| `set_group_file_folder`     | 新建群文件文件夹   |
| `del_group_file`            | 删除群文件文件     |
| `del_group_file_folder`     | 删除群文件文件夹   |
| `set_msg_emoji_like`        | 设置消息的表情回复 |
| `send_forward_msg`          | 发送合并转发       |
| `mark_private_msg_as_read`  | 标记私聊信息已读   |
| `mark_group_msg_as_read`    | 标记群聊信息已读   |
| `get_friend_msg_history`    | 获取私聊记录       |
| `set_self_profile`          | 设置个人资料       |
| `create_collection`         | 创建文本收藏       |
| `get_collection_list`       | 获取收藏列表       |
| `set_self_longnick`         | 设置个人签名       |
| `get_recent_contact`        | 获取最近的聊天记录 |
| `_mark_all_as_read`         | 标记所有为已读     |
| `get_profile_like`          | 获取自身点赞列表   |
| `set_group_portrait`        | 设置群头像         |
| `fetch_custom_face`         | 获取收藏表情       |
| `fetch_emoji_like`          | 拉取表情回应列表   |
| `set_input_status`          | 设置输入状态       |
| `get_group_info_ex`         | 获取群组额外信息   |

### gocqhttp 扩展接口

| 方法名                     | 说明                        |
| -------------------------- | --------------------------- |
| `.handle_quick_operation`  | 对事件执行快速操作(隐藏API) |
| `get_essence_msg_list`     | 获取精华消息列表            |
| `_send_group_notice`       | 发送群公告                  |
| `_del_group_notice`        | 删除群公告                  |
| `_get_group_notice`        | 获取群公告                  |
| `send_group_forward_msg`   | 发送合并转发(群聊)          |
| `send_private_forward_msg` | 发送合并转发(好友)          |
| `mark_msg_as_read`         | 标记消息已读                |
| `upload_group_file`        | 上传群文件                  |
| `download_file`            | 下载文件到缓存目录          |
| `get_group_msg_history`    | 获取群消息历史记录          |
| `get_group_system_msg`     | 获取群系统消息              |
| `get_online_clients`       | 获取当前账号在线客户端列表  |
| `ocr_image`                | 图片 `OCR`                  |
| `set_essence_msg`          | 设精🤪(设置消息为精华消息)   |
| `delete_essence_msg`       | 取消设精                    |
| `upload_private_file`      | 上传私聊文件                |
