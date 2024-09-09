export interface Receive {
  text: {
    type: 'text'
    data: {
      text: string
    }
  }
  face: {
    type: 'face'
    data: {
      id: string
    }
  }
  mface: {
    type: 'mface'
    data: {
      summary: string
      url: string
      emoji_id: string
      emoji_package_id: string
      key: string
    }
  }
  at: {
    type: 'at'
    data: {
      qq: string | 'all'
      name: string
    }
  }
  reply: {
    type: 'reply'
    data: {
      id: string
    }
  }
  image: {
    type: 'image'
    data: {
      file_unique: string
      file: string
      subType: string
      file_id: string
      url: string
      file_size: string
    }
  }
  record: {
    type: 'record'
    data: {
      file_unique: string
      file: string
      path: string
      file_id: string
      file_size: string
    }
  }
  file: {
    type: 'file'
    data: {
      file_unique: string
      file: string
      path: string
      url: string
      file_id: string
      file_size: string
    }
  }
  video: {
    type: 'video'
    data: {
      file_unique: string
      file: string
      path: string
      url: string
      file_id: string
      file_size: string
    }
  }
  json: {
    type: 'json'
    data: {
      data: string
    }
  }
  dice: {
    type: 'dice'
    data: {
      result: string
    }
  }
  rps: {
    type: 'rps'
    data: {
      result: string
    }
  }
  markdown: {
    type: 'markdown'
    data: {
      content: string
    }
  }
  forward: {
    type: 'forward'
    data: {
      id: string
      content: Receive[keyof Receive][]
    }
  }
}

export interface Send {
  text: {
    type: 'text'
    data: {
      text: string
    }
  }
  at: {
    type: 'at'
    data: {
      qq: string | 'all'
    }
  }
  reply: {
    type: 'reply'
    data: {
      id: string
    }
  }
  face: {
    type: 'face'
    data: {
      id: string
    }
  }
  mface: {
    type: 'mface'
    data: {
      emoji_id: string
      emoji_package_id: string
      key: string
      summary: string
    }
  }
  image: {
    type: 'image'
    data: {
      file: string
      name?: string
      summary?: string
      subType?: string
    }
  }
  file: {
    type: 'file'
    data: {
      file: string
      name?: string
    }
  }
  video: {
    type: 'video'
    data: {
      file: string
      name?: string
      thumb?: string
    }
  }
  record: {
    type: 'record'
    data: {
      file: string
      name?: string
    }
  }
  json: {
    type: 'json'
    data: {
      data: string
    }
  }
  dice: {
    type: 'dice'
    data: {}
  }
  rps: {
    type: 'rps'
    data: {}
  }
  music: {
    type: 'music'
    data:
      | {
          type: 'qq' | '163'
          id: string
        }
      | {
          type: 'custom'
          url: string
          audio: string
          title: string
          image?: string
          singer?: string
        }
  }
  node: {
    type: 'node'
    data:
      | {
          content: Send[keyof Send][]
        }
      | {
          id: string
        }
  }
}

export const Structs = {
  /**
   * 发送文字消息
   * @param text 要发送的文字
   * @returns { type: 'text', data: { text } }
   */
  text: function (text: string): Send['text'] {
    return { type: 'text', data: { text } }
  },
  /**
   * @某人
   * @param qq at的QQ号
   * @returns { type: 'at', data: { qq } }
   */
  at: function (qq: string | 'all' | number): Send['at'] {
    return { type: 'at', data: { qq: qq.toString() } }
  },
  /**
   * 回复消息
   * @param id 回复的消息id
   * @returns { type: 'reply', data: { id } }
   */
  reply: function (id: string | number): Send['reply'] {
    return { type: 'reply', data: { id: id.toString() } }
  },
  /**
   * 发送QQ表情
   * @param id QQ 表情 ID
   * @returns { type: 'face', data: { id } }
   */
  face: function (id: string | number): Send['face'] {
    return { type: 'face', data: { id: id.toString() } }
  },
  /**
   * 发送QQ表情包
   * @param summary 表情包简介
   * @param emoji_id 表情id
   * @param emoji_package_id 表情包id
   * @param key 未知(必要)
   * @returns { type: 'mface', data: { summary, emoji_id, emoji_package_id, key } }
   */
  mface: function (
    summary: string,
    emoji_id: string | number,
    emoji_package_id: string | number,
    key: string
  ): Send['mface'] {
    return {
      type: 'mface',
      data: {
        summary,
        emoji_id: emoji_id.toString(),
        emoji_package_id: emoji_package_id.toString(),
        key
      }
    }
  },
  /**
   * 发送图片
   * @param file 网络图片地址或者文件路径
   * @param name 图片名
   * @param summary 图片简介
   * @param subType 图片类型
   * @returns { type: 'image', data: { file, name, summary, subType } }
   */
  image: function (
    file: string,
    name?: string,
    summary?: string,
    subType?: string | number
  ): Send['image'] {
    return { type: 'image', data: { file, name, summary, subType: subType?.toString() } }
  },
  /**
   * 发文件
   * @param file 网络文件地址或文件路径
   * @param name 文件名
   * @returns { type: 'file', data: { file, name } }
   */
  file: function (file: string, name?: string): Send['file'] {
    return { type: 'file', data: { file, name } }
  },
  /**
   * 发视频
   * @param file 网络视频地址或者文件路径
   * @param name 视频名
   * @param thumb 预览图
   * @returns { type: 'video', data: { file, name, thumb } }
   */
  video: function (file: string, name?: string, thumb?: string): Send['video'] {
    return { type: 'video', data: { file, name, thumb } }
  },
  /**
   * 发语音
   * @param file 网络语音地址或者文件路径
   * @param name 语音备注
   * @returns { type: 'record', data: { file, name } }
   */
  record: function (file: string, name?: string): Send['record'] {
    return { type: 'record', data: { file, name } }
  },
  /**
   * 发送json消息
   * @param data json信息(序列化后)
   * @returns { type: 'json', data: { data } }
   */
  json: function (data: string): Send['json'] {
    return { type: 'json', data: { data } }
  },
  /**
   * 发送骰子魔法表情
   * @returns { type: 'dice', data: {} }
   */
  dice: function (): Send['dice'] {
    return { type: 'dice', data: {} }
  },
  /**
   * 发送猜拳魔法
   * @returns { type: 'rps', data: {} }
   */
  rps: function (): Send['rps'] {
    return { type: 'rps', data: {} }
  },
  /**
   * 音乐分享
   * @param type QQ音乐或网易云音乐QQ音乐
   * @param id 音乐id
   * @returns { type: 'music', data: { type, id } }
   */
  music: function (type: 'qq' | '163', id: string | number): Send['music'] {
    return { type: 'music', data: { type, id: id.toString() } }
  },
  /**
   * 分享非qq、网易云音乐 需要配置签名服务器
   * @param url 点击后跳转目标 URL
   * @param audio 音乐 URL
   * @param title 标题
   * @param image 发送时可选，内容描述
   * @param singer 发送时可选，图片 URL
   * @returns { type: 'music', data: { type: 'custom', url, audio, title, image, singer } }
   */
  customMusic: function (
    url: string,
    audio: string,
    title: string,
    image?: string,
    singer?: string
  ): Send['music'] {
    return { type: 'music', data: { type: 'custom', url, audio, title, image, singer } }
  },
  /**
   * 转发消息节点
   * @param id 消息id
   * @returns { type: 'node', data: { id } }
   */
  node: function (id: string | number): Send['node'] {
    return { type: 'node', data: { id: id.toString() } }
  },
  /**
   * 自定义转发消息节点
   * @param content 消息内容
   * @returns { type: 'node', data: { content } }
   */
  customNode: function (content: Send[keyof Send][]): Send['node'] {
    return { type: 'node', data: { content } }
  }
}
