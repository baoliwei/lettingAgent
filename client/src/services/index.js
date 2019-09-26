import { restApi } from '@/bases/http.base' // 请求方法
import user from './user.service' // 售后服务订单列表

const apis = [
  user
].reduce((total, current) => total.concat(current), [])

export default restApi(apis)
