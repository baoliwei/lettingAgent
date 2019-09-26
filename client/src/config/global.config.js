let env = process.env.ANNE_APP_CLIENT
let globalConfig = {
  development: { // 开发环境
    logoutUrl: '//aftersale-integration.shanyishanmei.com:8001/account/logout',
    loginUrl: 'http://login-testing.shanyishanmei.com:8080/cas/login?authn_method=captcha&service=http%3A%2F%2Faftersale-integration.shanyishanmei.com:8001%2Findex.php%3Fc%3Dauth%26m%3Dlogin',
    carInfo: '//vehicle-archives.shanyishanmei.com/vehicle-archives/', // 车辆信息详情页
    // carInfo: '//car-publish.shanyishanmei.com/#/car/edit/', // 车辆信息详情页
    OrderAftersaleUrl: '//aftersale-integration.shanyishanmei.com:8001',
    orderInfo: '//order-aftersale.shanyishanmei.com/order_aftersale_fe/index.html#/new/detail?id=' // 订单信息详情页
  },
  sandbox: { // 测试环境
    logoutUrl: '//aftersale-integration.shanyishanmei.com:8001/account/logout',
    loginUrl: 'http://login-testing.shanyishanmei.com:8080/cas/login?authn_method=captcha&service=http%3A%2F%2Faftersale-integration.shanyishanmei.com:8001%2Findex.php%3Fc%3Dauth%26m%3Dlogin',
    carInfo: '//vehicle-archives.shanyishanmei.com/vehicle-archives/', // 车辆信息详情页
    // carInfo: '//car-publish.shanyishanmei.com/#/car/edit/', // 车辆信息详情页
    OrderAftersaleUrl: '//aftersale-integration.shanyishanmei.com:8001',
    orderInfo: '//order-aftersale.shanyishanmei.com/order_aftersale_fe/index.html#/new/detail?id=' // 订单信息详情页
  },
  production: { // 线上环境
    logoutUrl: '//aftersale-integration.shanyishanmei.com/account/logout',
    loginUrl: 'https://login.shanyishanmei.com/cas/login?service=https%3A%2F%2Faftersale-integration.shanyishanmei.com%2F',
    carInfo: '//vehicle-archives.shanyishanmei.com/vehicle-archives/', // 车辆信息详情页
    // carInfo: '//car-publish.shanyishanmei.com/#/car/edit/', // 车辆信息详情页
    OrderAftersaleUrl: '//aftersale-integration.shanyishanmei.com',
    orderInfo: '//order-aftersale.shanyishanmei.com/order_aftersale_fe/index.html#/new/detail?id=' // 订单信息详情页
  }
}
globalConfig = globalConfig[env]
// 在路由之后去 加载loading
const NoAfterRouteIsLoading = []
// 兼容老系统
const RefundApprovalUrl = globalConfig.OrderAftersaleUrl

export { globalConfig, NoAfterRouteIsLoading, RefundApprovalUrl }
