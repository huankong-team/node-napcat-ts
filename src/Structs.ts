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
      id: number
    }
  }
  mface: {
    type: 'mface'
    data: {
      summary: string
      url: string
      emoji_id: string
      emoji_package_id: number
      key: string
    }
  }
  at: {
    type: 'at'
    data: {
      qq: number | 'all'
    }
  }
  reply: {
    type: 'reply'
    data: {
      id: number
    }
  }
  image: {
    type: 'image'
    data: {
      file: string
      url: string
      file_size: number
    }
  }
  record: {
    type: 'record'
    data: {
      file: string
      path: string
      file_size: number
    }
  }
  file: {
    type: 'file'
    data: {
      file: string
      path: string | undefined
      url: string | undefined
      file_id: string
      file_size: number
    }
  }
  video: {
    type: 'video'
    data: {
      file: string
      path: string
      url: string
      file_id: string
      file_size: number
    }
  }
  music: {
    type: 'music'
    data: {
      type: 'qq' | '163'
      id: number
    }
  }
  customMusic: {
    type: 'customMusic'
    data: {
      type: 'custom'
      url: string
      audio: string
      title: string
      image?: string
      singer?: string
    }
  }
  json: {
    type: 'json'
    data: any & {
      config: { token: string }
    }
  }
  dice: {
    type: 'dice'
    data: {
      result: number
    }
  }
  rps: {
    type: 'rps'
    data: {
      result: number
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
      id: number
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
      qq: number | 'all'
    }
  }
  reply: {
    type: 'reply'
    data: {
      id: number
    }
  }
  face: {
    type: 'face'
    data: {
      id: number
    }
  }
  mface: {
    type: 'mface'
    data: {
      emoji_id: string
      emoji_package_id: number
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
      subType?: number
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
  miniapp: {
    type: 'miniapp'
    data: any
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
    data: any
  }
  dice: {
    type: 'dice'
    data: {
      result: number
    }
  }
  rps: {
    type: 'rps'
    data: {
      result: number
    }
  }
  markdown: {
    type: 'markdown'
    data: {
      content: string
    }
  }
  music: {
    type: 'music'
    data:
      | {
          type: 'qq' | '163'
          id: number
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
          content: string | Send[keyof Send][]
        }
      | {
          id: number
        }
  }
}

export const CQ = {
  text: function (data: Send['text']['data']): Send['text'] {
    return { type: 'text', data }
  },
  at: function (data: Send['at']['data']): Send['at'] {
    return { type: 'at', data }
  },
  reply: function (data: Send['reply']['data']): Send['reply'] {
    return { type: 'reply', data }
  },
  face: function (data: Send['face']['data']): Send['face'] {
    return { type: 'face', data }
  },
  mface: function (data: Send['mface']['data']): Send['mface'] {
    return { type: 'mface', data }
  },
  image: function (data: Send['image']['data']): Send['image'] {
    return { type: 'image', data }
  },
  file: function (data: Send['file']['data']): Send['file'] {
    return { type: 'file', data }
  },
  video: function (data: Send['video']['data']): Send['video'] {
    return { type: 'video', data }
  },
  miniapp: function (data: Send['miniapp']['data']): Send['miniapp'] {
    return { type: 'miniapp', data }
  },
  record: function (data: Send['record']['data']): Send['record'] {
    return { type: 'record', data }
  },
  json: function (data: Send['json']['data']): Send['json'] {
    return { type: 'json', data }
  },
  dice: function (data: Send['dice']['data']): Send['dice'] {
    return { type: 'dice', data }
  },
  rps: function (data: Send['rps']['data']): Send['rps'] {
    return { type: 'rps', data }
  },
  markdown: function (data: Send['markdown']['data']): Send['markdown'] {
    return { type: 'markdown', data }
  },
  music: function (data: Send['music']['data']): Send['music'] {
    return { type: 'music', data }
  },
  node: function (data: Send['node']['data']): Send['node'] {
    return { type: 'node', data }
  }
}
