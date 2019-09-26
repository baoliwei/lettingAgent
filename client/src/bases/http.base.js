import fetch from '@/config/axios.config'

const DEFAULT_CONFIG = {
  isAutoMsg: true,
  // 自动loading
  isLoading: true,
  hasUid: true,
  // 如果参数是空值是不传
  isRemoveField: false,
  // 和 isRemoveField 一起使用
  removeField: []
}

const POST_HEADER = {
  headers: {
    'content-type': 'application/json'
  }
}

/**
 * 生产API
 * @param apis
 */
export function restApi (apis) {
  if (process.env.NODE_ENV === 'development') patron(apis)
  const methods = {}
  while (apis.length) {
    const { isExport, name, url, method } = apis.shift()
    if (isExport) {
      methods[name] = (params = {}) => {
        // if (typeof params !== 'object') {
        //   console.error('params type error')
        // }
        commonExport(url, params)
      }
    } else {
      methods[name] = (params = {}, config = {}) => {
        let opts = { ...DEFAULT_CONFIG, ...config }
        return fetch({
          method: method,
          url: url,
          ...getAxiosConfig(params, opts, method),
          ...opts
        })
      }
    }
  }
  return methods
}

/**
 * 处理请求参数
 * @param params
 * @param opts
 * @param type
 * @return {*}
 */
function getAxiosConfig (params, opts, type) {
  // if (typeof params !== 'object') {
  //   console.error('params type error')
  // }
  if (type === 'get') {
    return {
      params: getParams(params, opts)
    }
  } else {
    return {
      data: getParams(params, opts)
    }
  }
}

/**
 * get 提交
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Obejct} config  请求配置
 * @returns Promise
 */
export function get (url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...config }
  opts.params = getParams(params, opts)
  return fetch.get(url, opts)
}

/**
 *
 * post 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function post (url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...POST_HEADER, ...config }
  return fetch.post(url, getParams(params, opts), opts)
}

/**
 *
 * put 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function put (url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...POST_HEADER, ...config }
  return fetch.put(url, getParams(params, opts), opts)
}

/**
 *
 * delete 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function Delete (url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...POST_HEADER, ...config }
  return fetch.delete(url, getParams(params, opts), opts)
}

/**
 *
 * 上传
 * @export
 * @param {any} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} [config={}] 配置
 * @returns Promise
 */
export function upload (url, params = {}, config = {}) {
  let opts = { ...DEFAULT_CONFIG, ...POST_HEADER, ...config }
  let form = new FormData()
  Object.keys(params).forEach(key => {
    form.append(key, params[key])
  })
  return fetch.post(url, form, opts)
}

/**
 *
 * 处理参数 移除值是 空的 和加上一些用户信息等操作
 * @param {any} params 传入参数
 * @param {any} config 配置
 * @returns 返回新的参数
 */
function getParams (params, config) {
  // 用户相关
  if (!config.isRemoveField) {
    return params
  }
  return removeEmptyField(params, config.removeField)
}

/**
 *
 * 移除提交请求中 列为空 null undefined 的值
 * @param {any} [params={}] 传入的参数
 * @param {any} [removeField=[]] 需要移除的列
 */
function removeEmptyField (params = {}, removeField = []) {
  let copyParams = JSON.parse(JSON.stringify(params))
  let arrField = removeField
  if (removeField.length === 0) {
    arrField = Object.keys(params)
  }
  arrField.forEach(key => {
    let val = copyParams[key]
    if (val === '' || val === undefined || val === null) {
      delete copyParams[key]
    }
  })
  return copyParams
}

/**
 * 公共下载方法
 * @param {String} address
 * @param {Object} params
 */
function commonExport (address = '', params = {}) {
  if (typeof address === 'function') {
    address = address(params)
  }
  if (address[0] !== '/') throw new Error('export address must be begin with a "/"')
  let url = `${window.location.protocol}//${window.location.host}${address}`
  let payload = []
  for (let param in params) {
    payload.push(`${param}=${params[param]}`)
  }
  url = payload.length === 0 ? url : (url + '?' + payload.join('&'))
  let frame = document.createElement('iframe')
  frame.src = url
  document.body.appendChild(frame)
  setTimeout(() => { document.body.removeChild(frame) }, 30000)
}

/**
 * 检查APIS描述是否正确
 * @param apis
 */
function patron (apis) {
  if (!(apis instanceof Array)) throw new Error('The arguments to restApi Function must be an array')
  const filter = {}
  const tables = []
  for (let i = 0, len = apis.length; i < len; i++) {
    const api = apis[i]
    if (!filter[api.name]) {
      filter[api.name] = true
      if (!api.url) tables.push({ '尚未迁移的API': api.description, '原接口地址': api.old })
      continue
    }
    throw new Error(`The exported method name is not allowed to be same,
   ${api.name} function already exit! please recheck the ${api.description} structure!`)
  }
  // if (tables.length > 0) console.table(tables)
}

export const removeField = removeEmptyField
