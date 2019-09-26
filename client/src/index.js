'use strict'
import Vue from 'vue'
import Router from 'vue-router'
import layouts from './layouts'
import component from './components'
import store from './stores'
import routingGuard from './config/routingGuard.config'
import { report } from '@/bases/regSentry'
import '~/scss/index.scss'

import App from '@/views/App.vue'

import routerConfig from '@/config/router.config.js'
Vue.use(Router)
if (process.env.NODE_ENV === 'production' && process.env.ANNE_APP_CLIENT === 'production') report()

let router = new Router({
  mode: routerConfig.mode,
  base: routerConfig.base,
  routes: [
    { path: '/', component: App, children: routerConfig.tabs },
    routerConfig.redirect,
  ],
})
Vue.config.productionTip = process.env.NODE_ENV === 'development'
window.router = router

Vue.use(layouts)
Vue.use(component)

routingGuard(router, store)

new Vue({
  store,
  router
}).$mount('#app')
