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
  image: {
    type: 'image'
    data: {
      file: string
      url: string
      file_size: number
    }
  }
  reply: {
    type: 'reply'
    data: {
      id: number
    }
  }
  at: {
    type: 'at'
    data: {
      qq: number
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
  forward: {
    type: 'forward'
    data: {
      id: number
    }
  }
  file: {
    type: 'file'
    data: {
      file: string
      path: string | undefined
      file_id: string
      file_size: number
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
  face: {
    type: 'face'
    data: {
      id: number
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
  mface: {
    type: 'mface'
    data: {
      emoji_id: string
      emoji_package_id: number
      key: string
    }
  }
  image: {
    type: 'image'
    data: {
      file: string
    }
  }
  reply: {
    type: 'reply'
    data: {
      id: number
    }
  }
  at: {
    type: 'at'
    data: {
      qq: number
    }
  }
  record: {
    type: 'record'
    data: {
      path: string
    }
  }
  node: {
    type: 'node'
    data: { id: number } | { content: string }
  }
  file: {
    type: 'file'
    data: {
      path: string
    }
  }
}

export const CQ = {
  text: function (data: Send['text']['data']): Send['text'] {
    return { type: 'text', data }
  },
  face: function (data: Send['face']['data']): Send['face'] {
    return { type: 'face', data }
  },
  dice: function (): Send['dice'] {
    return { type: 'dice', data: {} }
  },
  rps: function (): Send['rps'] {
    return { type: 'rps', data: {} }
  },
  mface: function (data: Send['mface']['data']): Send['mface'] {
    return { type: 'mface', data }
  },
  image: function (data: Send['image']['data']): Send['image'] {
    return { type: 'image', data }
  },
  reply: function (data: Send['reply']['data']): Send['reply'] {
    return { type: 'reply', data }
  },
  at: function (data: Send['at']['data']): Send['at'] {
    return { type: 'at', data }
  },
  record: function (data: Send['record']['data']): Send['record'] {
    return { type: 'record', data }
  },
  node: function (data: Send['node']['data']): Send['node'] {
    return { type: 'node', data }
  },
  file: function (data: Send['file']['data']): Send['file'] {
    return { type: 'file', data }
  }
}
