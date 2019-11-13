const List = () => import('./src/list.vue')
const Detail = () => import('./src/detail.vue')

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
    },
    {
      path: '/user/detail/:id',
      name: 'Detail',
      component: Detail,
      meta: {
        title: '用户信息',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    }
  ]
}
