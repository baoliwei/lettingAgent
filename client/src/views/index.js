import App from '@/views/App.vue'
import listRouter from './list'
import detailRouter from './detail'
import homeRouter from './home'
import cancelOrderRouter from './cancelOrder'
import cancelOrderDetailRouter from './cancelOrderDetail'
import refundOrderDetailRouter from './refundOrderDetail'
import { wait, complete, reject, pending, failed } from './refundOrder'
import refundSbumit from './refundSubmit'

// 这是跟路由
const rootRouter = {
  path: '/',
  component: App,
  children: [
    wait,
    complete,
    reject,
    pending,
    failed
  ]
}
// 当匹配的路由不存在时，重定向路由
const redirectRoute = {
  path: '*',
  redirect: '/'
}
  /**
   * 兼容老数据
   */
  ;[listRouter, detailRouter, homeRouter, cancelOrderRouter, cancelOrderDetailRouter, refundOrderDetailRouter, refundSbumit].forEach(fn => fn(rootRouter.children))
export default [rootRouter, redirectRoute]
