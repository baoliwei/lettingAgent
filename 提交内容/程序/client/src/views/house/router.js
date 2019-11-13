const List = () => import('./src/list.vue')
const Detail = () => import('./src/detail.vue')

export default {
  tabs: [
    {
      path: '/house/list',
      name: 'house',
      component: List,
      meta: {
        title: '房源管理',
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
