const home = () => import('./src/home.vue')

export default {
  tabs: [
    {
      path: '/home',
      name: 'home',
      alias: '/',
      component: home,
      meta: {
        title: '首页',
        isMenu: true,
        rule: '',
        isAddTab: true
      }
    }
  ]
}
