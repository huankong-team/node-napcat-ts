export const getTime = () => new Date().toLocaleString()

export const logger = {
  log: (...args: any[]) => {
    console.log(`[${getTime()}]`, ...args)
  },
  warn: (...args: any[]) => {
    console.warn(`[${getTime()}]`, ...args)
  },
  debug: (...args: any[]) => {
    console.debug(`[${getTime()}]`, ...args)
  },
  dir: (json: any) => {
    console.dir(json, { depth: null })
  }
}

export const SPLIT = /(?=\[CQ:)|(?<=])/
export const CQ_TAG_REGEXP = /^\[CQ:([a-z]+)(?:,([^\]]+))?]$/
export const CQ_TAG_JSON_REGEXP = /^\[CQ:json,data=(\{.*\})\]$/

/**
 * CQ码转JSON
 */
export function convertCQCodeToJSON(msg: string) {
  msg = CQCodeUnescape(msg)
  let msgArr: string[] = []
  msg.split(SPLIT).forEach((value) => {
    if (value.at(0) !== '[' && value.at(value.length - 1) === ']' && msgArr.length > 0) {
      msgArr[msgArr.length - 1] += value
    } else {
      msgArr.push(value)
    }
  })

  return msgArr.map((tagStr) => {
    const json = CQ_TAG_JSON_REGEXP.exec(tagStr)
    if (json !== null) return { type: 'json', data: { data: json[1] } }

    const match = CQ_TAG_REGEXP.exec(tagStr)
    if (match === null) return { type: 'text', data: { text: tagStr } }

    const [, tagName, value] = match
    if (value === undefined) return { type: tagName, data: {} }

    const data = Object.fromEntries(
      value.split(',').map((v) => {
        const index = v.indexOf('=')
        return [v.slice(0, index), v.slice(index + 1)]
      })
    )

    return { type: tagName, data }
  })
}

interface CQCode {
  type: string
  data: {
    [k: string]: string
  }
}

/**
 * JSON转CQ码
 */
export function convertJSONToCQCode(json: CQCode | CQCode[]): string {
  const conver = (json: any) => {
    if (json.type === 'text') return json.data.text
    return `[CQ:${json.type}${Object.entries(json.data)
      .map(([k, v]) => (v ? `,${k}=${v}` : ''))
      .join('')}]`
  }

  if (Array.isArray(json)) {
    return json.map((item) => conver(item)).join('')
  } else {
    return conver(json)
  }
}

export function CQCodeUnescape(str: string): string {
  return str
    .replace(/&#44;/g, ',')
    .replace(/&#91;/g, '[')
    .replace(/&#93;/g, ']')
    .replace(/&amp;/g, '&')
}
