import { restApi } from '@/bases/http.base' // 请求方法
import user from './user.service'
import house from './house.service'

const apis = [
  user, house
].reduce((total, current) => total.concat(current), [])

export default restApi(apis)
