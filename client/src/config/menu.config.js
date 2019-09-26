const menuRule = require.context('../', true, /^\.\/(pages|views)(\/[\w.-]+)?\/menu.(js|ts)$/)

const menuConfig = (r => {
  return r.keys().map(key => {
    return r(key).default
  })
})(menuRule)

// 非组件父级路由 此处拿到路由配置数据
const mConfig = menuConfig.reduce((pre, next) => {
  return pre.concat(next)
}, [])

function mergeSameParent (arr) { // 相同祖先的元素进行合并。
  let hash = {}
  let hashArr = JSON.parse(JSON.stringify(arr))
  arr.forEach((item, index) => {
    if (hash[item.name]) { // 如果存在
      hash[item.name].index.push(index)
      hash[item.name].count++
    } else {
      hash[item.name] = {
        name: item.name,
        index: [index],
        count: 1
      }
    }
  })

  Object.keys(hash).forEach(item => {
    if (hash[item].count > 1) {
      let tempArr = {}
      hash[item].index.forEach((indexItem, index) => {
        if (index === 0) {
          tempArr = JSON.parse(JSON.stringify(arr[indexItem]))
        } else {
          tempArr.children = tempArr.children.concat(arr[indexItem].children)
        }
        hashArr.splice(indexItem, 1, null)
      })
      hashArr.push(tempArr)
    }
  })

  return hashArr.filter(item => {
    if (item) {
      return item
    }
  })
}
const menus = mergeSameParent(mConfig)

// 路由进行排序
function menuSort (arr) {
  arr.forEach((item) => {
    arr.sort((a, b) => a.index - b.index)
    if (item.children) {
      menuSort(item.children)
    }
  })
}
menuSort(menus)
// let sortMenus = menus.map(t => t).sort((a, b) => a.index - b.index)
export const AsideMenuConfig = []
export default AsideMenuConfig.concat(menus)
