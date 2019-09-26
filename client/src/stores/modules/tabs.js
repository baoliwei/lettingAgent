import { TABS_ADD_TAB, CURRENT_TAB, DELETE_TAB, TABS_TOOLS_COMMAND } from '../mutation.types'

const state = {
  tabs: [],
  currentTab: '/'
}

const mutations = {
  [TABS_ADD_TAB] (state, value) {
    let name = value.name
    // 首页已经默认加载了路由 所以不加载 路由进tabs
    if (state.tabs.findIndex(item => item.name === name) === -1 && value.label !== '首页') {
      state.tabs.push(value)
    }
    // 处理选中逻辑
    state.currentTab = name
  },
  [CURRENT_TAB] (state, value) {
    state.currentTab = value
  },
  [DELETE_TAB] (state, value) {
    let tabs = state.tabs
    // 定位要移除的tab 注意【query】会被忽略
    const valueArgs = value.split('?')
    let index = tabs.findIndex(item => {
      const itemArgs = item.name.split('?')
      return itemArgs[0] === valueArgs[0]
    })
    // ---------------------- get refer -------------------
    let refers = value.split('?')
    let refer = ''
    if (refers.length > 1) {
      refer = refers[1].split('&').find(item => item.indexOf('refer') > -1)
    }
    // ---------------------- refer end -------------------------
    if (index !== -1) {
      tabs.splice(index, 1)
      let lastIndex = Math.max(tabs.length - 1, -1)
      let WillGoToTab
      // 处理选中到最后一位的操作 如果值是 0 则选中首页
      if (lastIndex === -1) {
        WillGoToTab = { fullPath: '/', name: '/', label: '首页' }
      } else {
        WillGoToTab = tabs[lastIndex]
      }
      // 获取真实的地址
      let realPath = (refer && WillGoToTab.name.indexOf('refer') === -1) ? (WillGoToTab.name.indexOf('?') ? `${WillGoToTab.name}&${refer}` : `${WillGoToTab.name}?${refer}`) : WillGoToTab.name
      state.currentTab = realPath
      WillGoToTab.fullPath = realPath
      window.router.push(realPath)
    }
  },
  [TABS_TOOLS_COMMAND] (state, value) {
    switch (true) {
      case value === 'closeAll':
      // 如果当前选中的是首页直接清空当前tabs 中所有数据
      case value === 'closeOther' && state.currentTab === '/': // eslint-disable-line
        state.tabs = []
        state.currentTab = '/'
        window.router.push('/')
        break
      case value === 'closeOther':
        let currentTab = state.tabs.filter(item => item.name === state.currentTab)[0]
        state.tabs = [currentTab]
        break
    }
  }
}

export default {
  state,
  mutations
}
