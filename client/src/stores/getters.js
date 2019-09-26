// 获取所有的标签
export const getTabs = state => {
  return state.tabs.tabs
}
export const getTabKeepAliveInclude = state => {
  return state.tabs.tabs.filter(tab => {
    if (tab.meta) {
      if (tab.meta.keepAlive) {
        return true
      }
    }
    return false
  }).map(tab => tab.name)
}
