import { isArray } from '@/utils/util'
// import {dateFormat, isObject} from '@rrc/utils'
import { dateFormat } from '@rrc/utils'
export default {
  methods: {
    // 处理表单查询中的一些 和后端不兼容的字段
    $parse (cols = {
      date: {
        // 时间列
        field: ['start_time', 'end_time'],
        format: 'yyyy-MM-dd'
      }
    }) {
      let params = {}
      Object.keys(this.form).forEach(key => {
        let val = this.form[key]
        switch (true) {
          // 处理时间
          case key === 'date':
            let { field: [startField, endField], format } = cols.date
            let [startTime, endTime] = val
            if (startTime) {
              params[startField] = dateFormat(startTime, format)
              params[endField] = dateFormat(endTime, format)
            }
            break
          // 处理数组
          case isArray(val) && key !== 'date':
            params[key] = val.join(',')
            break
          // 处理对象 因为使用的是 application/json 格式故不处理 object 格式
          // case isObject(val):
          //   params[key] = JSON.stringify(val)
          //   break
          default:
            params[key] = val
            break
        }
      })
      return params
    },
    // 字符串去除前后空格
    strTrim (str) {
      return str.replace(/^\s+|\s+$/g, '')
    }
  }
}
