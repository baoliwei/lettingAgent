const List = () => import('./src/list.vue')
const Detail = () => import('./src/detail.vue')

export default {
  tabs: [
    {
      path: '/lease/list',
      name: 'leaseHouse',
      component: List,
      meta: {
        title: '出租管理',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    },
    {
      path: '/lease/detail/:type/:id',
      name: 'leaseHouseDetail',
      component: Detail,
      meta: {
        title: '出租管理信息',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    }
  ]
}
