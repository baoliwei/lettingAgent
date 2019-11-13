/**
 * @flow
 */
import { isObject } from '@rrc/utils'

const hasOwnProperty = Object.prototype.hasOwnProperty

const _toString = Object.prototype.toString

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function isArray (arr) {
  return _toString.call(arr) === '[object Array]'
}

export const toDate = function (date) {
  return isDate(date) ? new Date(date) : null
}

export function isDate (date) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  return true
}

/**
 * Remove an item from an array
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

export function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

export function isDef (v) {
  return v !== undefined && v !== null
}

export function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/**
 *
 * 把一个对象转为 数组形式的数据
 * @examples
 * objectToArray({ 待回访: '1', 带看: 19 }) 返回 [{label: '待回访', value: 1}, {label: '带看', value: 19}]
 *
 * @export
 * @param {any} obj 需要转换的数据
 * @returns Array 转换好的数据
 */
export function objectToArray (obj) {
  if (!isObject(obj)) {
    return []
  }
  return Object.keys(obj).map(key => {
    return { label: key, value: obj[key] }
  })
}

/**
  * 获取从某一日期偏移 x 的日期
  * @param {string} offset 格式：加上"-"表示是过去的时间 -1y(过去1年) 1y(1年) 1M(1个月) 1d(1天) 1h(1小时) 1m(1分钟) 1s(1s) 1w(1周)。
  * @param {Date} begin new Date()
  *
  */
export function getDateByOffset (offset, begin) {
  let from = new Date(begin)
  // 不是date类型
  if (!(from instanceof Date)) {
    // console.warn('输入的起始日期不合法', from)
  }
  let rest = offset.match(/^([-+]?\d+)([YyMmDdHhSsWw])$/)
  if (!rest) {
    // console.error('输入的offset参数不合法:只支持Y,y,M,m,D,d,H,h,S,s,W,w结尾的字符串', offset)
    return from
  }
  let [num, offsetUnit] = rest
  const offsetNum = parseInt(num, 10)
  switch (offsetUnit) {
    case 'y':
    case 'Y':
      return from.setFullYear(from.getFullYear() + offsetNum)
    case 'M':
      return from.setMonth(from.getMonth() + offsetNum)
    case 'D':
    case 'd':
      return from.setDate(from.getDate() + offsetNum)
    case 'H':
    case 'h':
      return from.setHours(from.getHours() + offsetNum)
    case 'm':
      return from.setMinutes(from.getMinutes() + offsetNum)
    case 'W':
    case 'w':
      return from.setDate(from.getDate() + offsetNum * 7)
    default:
      return from
  }
}

/**
 * 把传入的以分为单位的金额转化为以元为单位
 * @param {Number} 传入的分
 */
export function pennyToYuan (value) {
  value = value / 100
  const newValue = parseFloat((value + '').replace(/[^\d.-]/g, '')).toFixed(2) + ''
  let integer = newValue.split('.')[0].split('').reverse() // 整数部分
  let decimal = newValue.split('.')[1] // 小数部分
  let result = ''
  for (let i = 0; i < integer.length; i++) {
    result += integer[i] + ((i + 1) % 3 === 0 && i + 1 !== integer.length ? ',' : '')
  }
  return (
    result.split('').reverse().join('') + '.' + decimal
  )
}
