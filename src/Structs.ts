export interface Receive {
  text: {
    type: "text"
    data: {
      text: string
    }
  }
  face: {
    type: "face"
    data: {
      id: number
    }
  }
  mface: {
    type: "mface"
    data: {
      summary: string
      url: string
      emoji_id: string
      emoji_package_id: number
      key: string
    }
  }
  at: {
    type: "at"
    data: {
      qq: number | "all"
    }
  }
  reply: {
    type: "reply"
    data: {
      id: number
    }
  }
  image: {
    type: "image"
    data: {
      file: string
      url: string
      file_size: number
    }
  }
  record: {
    type: "record"
    data: {
      file: string
      path: string
      file_size: number
    }
  }
  file: {
    type: "file"
    data: {
      file: string
      path: string | undefined
      url: string | undefined
      file_id: string
      file_size: number
    }
  }
  video: {
    type: "video"
    data: {
      file: string
      path: string
      url: string
      file_id: string
      file_size: number
    }
  }
  music: {
    type: "music"
    data: {
      type: "qq" | "163"
      id: number
    }
  }
  customMusic: {
    type: "customMusic"
    data: {
      type: "custom"
      url: string
      audio: string
      title: string
      image?: string
      singer?: string
    }
  }
  json: {
    type: "json"
    data: any & {
      config: { token: string }
    }
  }
  dice: {
    type: "dice"
    data: {
      result: number
    }
  }
  rps: {
    type: "rps"
    data: {
      result: number
    }
  }
  markdown: {
    type: "markdown"
    data: {
      content: string
    }
  }
  forward: {
    type: "forward"
    data: {
      id: number
    }
  }
}

export interface Send {
  text: {
    type: "text"
    data: {
      text: string
    }
  }
  at: {
    type: "at"
    data: {
      qq: number | "all"
    }
  }
  reply: {
    type: "reply"
    data: {
      id: number
    }
  }
  face: {
    type: "face"
    data: {
      id: number
    }
  }
  mface: {
    type: "mface"
    data: {
      emoji_id: string
      emoji_package_id: number
      key: string
      summary: string
    }
  }
  image: {
    type: "image"
    data: {
      file: string
      name?: string
      summary?: string
      subType?: number
    }
  }
  file: {
    type: "file"
    data: {
      file: string
      name?: string
    }
  }
  video: {
    type: "video"
    data: {
      file: string
      name?: string
      thumb?: string
    }
  }
  miniapp: {
    type: "miniapp"
    data: any
  }
  record: {
    type: "record"
    data: {
      file: string
      name?: string
    }
  }
  json: {
    type: "json"
    data: any
  }
  dice: {
    type: "dice"
    data: {
      result: number
    }
  }
  rps: {
    type: "rps"
    data: {
      result: number
    }
  }
  markdown: {
    type: "markdown"
    data: {
      content: string
    }
  }
  music: {
    type: "music"
    data:
      | {
          type: "qq" | "163"
          id: number
        }
      | {
          type: "custom"
          url: string
          audio: string
          title: string
          image?: string
          singer?: string
        }
  }
  node: {
    type: "node"
    data:
      | {
          content: string | Send[keyof Send][]
        }
      | {
          id: number
        }
  }
}

export const Structs = {
  /**
   * 发送文字消息
   * @param text 要发送的文字
   */
  text: function (text: string): Send["text"] {
    return {
      type: "text",
      data: { text },
    }
  },
  /**
   * @某人
   * @param qq at的QQ号
   */
  at: function (qq: number | "all"): Send["at"] {
    return {
      type: "at",
      data: { qq },
    }
  },
  /**
   * 回复消息
   * @param id 回复的消息id
   */
  reply: function (id: number): Send["reply"] {
    return {
      type: "reply",
      data: { id },
    }
  },
  /**
   * 发送QQ表情
   * @param id QQ 表情 ID
   */
  face: function (id: number): Send["face"] {
    return {
      type: "face",
      data: { id },
    }
  },
  /**
   *
   * @param summary
   * @param emoji_id
   * @param emoji_package_id
   * @param key
   */
  mface: function (
    summary: string,
    emoji_id: string,
    emoji_package_id: number,
    key: string
  ): Send["mface"] {
    return {
      type: "mface",
      data: { summary, emoji_id, emoji_package_id, key },
    }
  },
  /**
   * 发送图片
   * @param file 网络图片地址或者文件路径
   * @param name 图片名
   * @param summary
   * @param subType
   */
  image: function (
    file: string,
    name?: string,
    summary?: string,
    subType?: number
  ): Send["image"] {
    return {
      type: "image",
      data: { file, name, summary, subType },
    }
  },
  /**
   * 发文件
   * @param file
   * @param name
   */
  file: function (file: string, name?: string): Send["file"] {
    return {
      type: "file",
      data: { file, name },
    }
  },
  /**
   * 发视频
   * @param file 网络视频地址或者文件路径
   * @param name 视频名
   * @param thumb
   */
  video: function (file: string, name?: string, thumb?: string): Send["video"] {
    return { type: "video", data: { file, name, thumb } }
  },
  /**
   * 发小程序？
   * @param data
   */
  miniapp: function (data: Send["miniapp"]["data"]): Send["miniapp"] {
    return { type: "miniapp", data }
  },
  /**
   * 发语音
   * @param file 发送语音的语音文件支持mp3、wav等多种音频格式直接发送
   * @param name
   */
  record: function (file: string, name?: string): Send["record"] {
    return { type: "record", data: { file, name } }
  },
  /**
   *  json消息 发送需要自行签名token
   * @param data
   */
  json: function (data: Send["json"]["data"]): Send["json"] {
    return { type: "json", data }
  },
  /**
   * 发送骰子魔法表情
   * @param result 发送的骰子魔法表情结果？
   */
  dice: function (result: number): Send["dice"] {
    return { type: "dice", data: { result } }
  },
  /**
   * 发送猜拳魔法
   * @param result 发送的猜拳魔法表情结果？
   */
  rps: function (result: number): Send["rps"] {
    return { type: "rps", data: { result } }
  },
  /**
   * ***不支持发送markdown***
   * @param content
   */
  markdown: function (content: string): Send["markdown"] {
    return { type: "markdown", data: { content } }
  },
  /**
   * 音乐分享
   * @param type QQ音乐或网易云音乐QQ音乐传ID发送无须配置 其余需要配置签名服务器
   * @param id 音乐id
   */
  music: function (type: "qq" | "163", id: number): Send["music"] {
    return { type: "music", data: { type, id } }
  },
  /**
   * 分享非qq、网易云音乐
   * @param type "custom"
   * @param url 点击后跳转目标 URL
   * @param audio 音乐 URL
   * @param title 标题
   * @param image 发送时可选，内容描述
   * @param singer 发送时可选，图片 URL
   * @returns
   */
  customMusic: function (
    type: "custom",
    url: string,
    audio: string,
    title: string,
    image?: string,
    singer?: string
  ): Send["music"] {
    return { type: "music", data: { type, url, audio, title, image, singer } }
  },
  /**
   * 转发消息？
   * @param data
   * @returns
   */
  node: function (data: Send["node"]["data"]): Send["node"] {
    return { type: "node", data }
  },
}
