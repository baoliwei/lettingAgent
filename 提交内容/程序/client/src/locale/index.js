import Format from './format'
import crm from './crm'

const format = Format()

function t (path, options) {
  let value = ''
  const array = path.split('.')
  let current = crm
  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i]
    value = current[property]
    // 如果属性值没有对应上key 直接返回当前key
    if (value === undefined) {
      return property
    }
    if (i === j - 1) return format(value, options)
    if (!value) return ''
    current = value
  }
  return ''
}

export default {
  t: t,
  install (Vue) {
    Vue.mixin({
      created () {
        this.$t = (...args) => {
          return t.apply(this, args)
        }
      }
    })
  }
}
