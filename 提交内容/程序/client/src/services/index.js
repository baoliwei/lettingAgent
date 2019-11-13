import { restApi } from '@/bases/http.base' // 请求方法
import user from './user.service'
import house from './house.service'
import lease from './lease.service'
import sale from './sale.service'
const apis = [
  user, house, lease, sale
].reduce((total, current) => total.concat(current), [])

export default restApi(apis)
