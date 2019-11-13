import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import user from './modules/user'
import tabs from './modules/tabs'
import state from './state'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const plugins = debug ? [createLogger()] : []

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    user,
    tabs
  },
  strict: debug,
  plugins: plugins
})

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./modules/user', './modules/tabs', './state'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newUser = require('./modules/user').default
    const newTabs = require('./modules/tabs').default
    const newState = require('./state').default
    // 加载新模块
    store.hotUpdate({
      state: newState,
      modules: {
        user: newUser,
        tabs: newTabs
      }
    })
  })
}
export default store
