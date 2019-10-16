let env = process.env.ANNE_APP_CLIENT
let globalConfig = {
  development: { // 开发环境
    logoutUrl: '/dev/users/logout',
  },
  sandbox: { // 测试环境
    logoutUrl: '/users/logout',
  },
  production: { // 线上环境
    logoutUrl: '/users/logout',
  }
}
globalConfig = globalConfig[env]
// 在路由之后去 加载loading
const NoAfterRouteIsLoading = []
// 兼容老系统
const RefundApprovalUrl = globalConfig.OrderAftersaleUrl

export { globalConfig, NoAfterRouteIsLoading, RefundApprovalUrl }
