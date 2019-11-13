import Vue from 'vue'
// import Cookies from 'js-cookie'
import { isFunction } from '@rrc/utils'
import NProgress from 'nprogress'
import { NoAfterRouteIsLoading } from './global.config'
NProgress.configure({ showSpinner: false }) // 取消loading 转圈

/**
 * @export
 * @param {any} router 路由
 * @param {any} store vuex store
 */
export default function routingGuard (router, store) {
  // 全局前置路由守卫
  router.beforeEach(async (to, from, next) => {
    const { matched, fullPath } = to
    const goToNext = () => {
      const refer = from.query.refer // 处理来源
      let address = fullPath // 要跳转的地址
      if (refer && to.fullPath.indexOf('refer') === -1) { // 此处为业务需求需要，从售后服务跳转过来的时候去掉导航
        address = fullPath.indexOf('?') > -1 ? `${fullPath}&refer=${refer}` : `${fullPath}?refer=${refer}`
      }
      NProgress.start()
      // 添加tab TODO 如果是 没有带父级APP 的不需要 执行添加操作
      if (matched.some(record => record.meta.isAddTab)) {
        let title = to.meta.title
        // tab(标签名字)
        let label = title
        // tab name (标签Id) 修改为用路由路径来进行匹配。
        // const tabName = address.split('?')[0]
        // 如果标签 名字是用function 返回的 则认为他是需要打开多个同一个标签 则使用连接 作为标签name
        if (isFunction(title)) {
          label = title(to)
        }
        store.commit('TABS_ADD_TAB', { name: address, fullPath: address, label: label || '新标签', meta: to.meta })
      }
      if (/^http/.test(address)) {
        window.location.href = address
      } else {
        // 刷新页面
        if (to.fullPath && from.fullPath && to.fullPath.split('?')[0] === from.fullPath.split('?')[0]) {
          NProgress.done()
        }
        // 这里这么做的原因是：
        // 如果不判断是否修改了跳转地址，而是每次都跳转新地址将会导致死循环。
        address === fullPath ? next() : next(address)
      }
    }
    let isHasRule = false
    let rule
    matched.forEach(record => {
      if (record.meta && record.meta.rule) {
        isHasRule = true
        rule = record.meta.rule
      }
    }) // 是否需要权限
    if (isHasRule) { // 需要权限 为了减少请求
      return store.dispatch('getUserInfo').then(() => { // 请求权限接口
        let isRule = store.getters[typeof rule === 'function' ? rule(to) : rule]
        if (isRule) { // 如果有权限
          goToNext()
        } else {
          next('/')
          Vue.$alert('权限不足')
        }
      })
    }
    goToNext()
  })
  // 全局后置路由守卫
  router.afterEach((to) => {
    let { name } = to
    if (NoAfterRouteIsLoading.indexOf(name) === -1) {
      setTimeout(() => {
        NProgress.done()
      }, 10)
    }
  })
}
