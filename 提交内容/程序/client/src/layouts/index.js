import Sidebar from './sidebar'
import Content from './content'
import Body from './body'
import Header from './header'
import Tabs from './tabs'

const components = [
  Sidebar,
  Content,
  Body,
  Header,
  Tabs
]

const install = (Vue) => {
  if (install.installed) {
    return
  }

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
