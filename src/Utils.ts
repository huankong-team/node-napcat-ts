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

export const getTime = () => new Date().toLocaleString()

export const SPLIT = /(?=\[CQ:)|(?<=])/
export const CQ_TAG_REGEXP = /^\[CQ:([a-z]+)(?:,([^\]]+))?]$/

interface Struct {
  type: string
  data: {
    [k: string]: any
  }
}

/**
 * CQ码转JSON
 */
export function convertCQCodeToJSON(msg: string): Struct[] {
  return CQCodeDecode(msg)
    .split(SPLIT)
    .map((tagStr) => {
      const match = CQ_TAG_REGEXP.exec(tagStr)
      if (match === null) return { type: 'text', data: { text: tagStr } }

      const [, tagName, value] = match
      if (value === undefined) return { type: tagName, data: {} }

      const data = Object.fromEntries(value.split(',').map((item) => item.split('=')))
      return { type: tagName, data }
    })
}

const _conver = (json: any) => {
  if (json.type === 'text') return json.data.text
  return `[CQ:${json.type}${Object.entries(json.data)
    .map(([k, v]) => (v ? `,${k}=${v}` : ''))
    .join('')}]`
}

/**
 * JSON转CQ码
 */
export function convertJSONToCQCode(json: Struct | Struct[]): string {
  if (Array.isArray(json)) {
    return json.map((item) => _conver(item)).join('')
  } else {
    return _conver(json)
  }
}

export function CQCodeDecode(str: string): string {
  return str
    .replace(/&#44;/g, ',')
    .replace(/&#91;/g, '[')
    .replace(/&#93;/g, ']')
    .replace(/&amp;/g, '&')
}

export function CQCodeEncode(str: string): string {
  return str
    .replace(/,/g, '&#44;')
    .replace(/\[/g, '&#91;')
    .replace(/]/g, '&#93;')
    .replace(/&/g, '&amp;')
}
