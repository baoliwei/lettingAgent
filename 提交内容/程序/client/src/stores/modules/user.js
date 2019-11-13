import service from '@/services'
const { currentUser } = service

const state = {
  isLogin: false,
  userInfo: {
    name: ''
  }
}

const mutations = {
  setIsLogin (state, flag) {
    state.isLogin = flag
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo // eslint-disable-line
  }
}

const actions = {
  async getUserInfo ({ commit }) {
    let result = null
    result = await currentUser()
    console.log(result)
    commit('setIsLogin', true)
    commit('setUserInfo', result.result)
  }
}

export default {
  state,
  mutations,
  actions
}
