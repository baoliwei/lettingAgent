const List = () => import('./src/list.vue')
const Detail = () => import('./src/detail.vue')

export default {
  tabs: [
    {
      path: '/sale/list',
      name: 'saleHouse',
      component: List,
      meta: {
        title: '出租管理',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    },
    {
      path: '/sale/detail/:type/:id',
      name: 'saleHouseDetail',
      component: Detail,
      meta: {
        title: '出售管理信息',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    }
  ]
}
