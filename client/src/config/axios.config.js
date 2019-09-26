import Vue from 'vue'
import axios from 'axios'
// import { isUndefined } from '@rrc/utils'

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/dev',
  timeout: 200000,
  withCredentials: true
})
// loading 组
let ARR_LOADING = []
let LOADING_INSTANCE = null
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    let {data: {status, msg: msg, result}, config} = response // eslint-disable-line
    status = Number(status)
    if (config.isLoading) {
      let index = ARR_LOADING.indexOf(config.url)
      ARR_LOADING.splice(index, 1)
      if (ARR_LOADING.length === 0) {
        LOADING_INSTANCE && LOADING_INSTANCE.close()
        LOADING_INSTANCE = null
      }
    }
    if (status !== 0) {
      // 是否自动提示消息
      if (config.isAutoMsg && !!msg) {
        Vue.prototype.$notify({
          title: '提示',
          message: msg || '接口错误，请稍候再试',
          type: 'error'
        })
      }
      return Promise.reject({status, data, msg}) // eslint-disable-line
    } else {
      return response.data
    }
  },
  error => {
    ARR_LOADING = []
    LOADING_INSTANCE && LOADING_INSTANCE.close()
    LOADING_INSTANCE = null
    let response = error.response
    if (response === undefined) {
      Vue.prototype.$notify({
        title: '提示',
        message: '网络异常, 请刷新重试',
        type: 'error'
      })
      return Promise.reject(error)
    }
    Vue.prototype.$notify({
      title: '提示',
      message: '网络异常, 请刷新重试',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default function (config) {
  if (typeof config.url === 'function') {
    config.url = config.url(config.method === 'get' ? config.params : config.data)
  }
  return service(config)
}
