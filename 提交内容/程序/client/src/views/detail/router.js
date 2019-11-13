const detail = () => import('./src/detail.vue')
export default {
  tabs: [
    {
      path: '/new/detail',
      name: 'detail',
      component: detail,
      meta: {
        title (to) {
          return `订单详情-${to.query.id}`
        },
        isMenu: false,
        isAddTab: true,
        keepAlive: true, // 关闭之后组件activated生命周期会无法执行，如需关闭，记得处理组件及其子组件的activated内的事件！！！
        // rule: 'OrderDetailAuth'
      }
    }
  ]
}
