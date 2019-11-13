const aftersale = () => import('./src/list.vue')

export default {
  tabs: [
    {
      path: '/new/aftersale',
      name: 'aftersale',
      component: {
        template: '<router-view></router-view>'
      },
      meta: {
        title: '订单列表',
        isMenu: true,
        isAddTab: false,
        rule: ''
      },
      children: [
        {
          path: 'list/:type',
          component: aftersale,
          meta: {
            // title (to) {
            //   return aftersaleTitle[to.params.type].title
            // },
            isMenu: true,
            isAddTab: true,
            keepAlive: true, // 关闭之后组件activated生命周期会无法执行，如需关闭，记得处理组件及其子组件的activated内的事件！！！
            // rule (to) {
            //   return aftersaleTitle[to.params.type].permission
            // }
          }
        }
      ]
    }
  ]
}
