const List = () => import('./src/list.vue')

export default {
  tabs: [
    {
      path: '/user/list',
      name: 'user',
      component: List,
      meta: {
        title: '用户管理',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    }
  ]
}
