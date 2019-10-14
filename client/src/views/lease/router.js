const List = () => import('./src/list.vue')
const Detail = () => import('./src/detail.vue')

export default {
  tabs: [
    {
      path: '/lease/list',
      name: 'house',
      component: List,
      meta: {
        title: '出租管理',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    },
    {
      path: '/house/detail/:type/:id',
      name: 'houseDetail',
      component: Detail,
      meta: {
        title: '房源信息',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    }
  ]
}
