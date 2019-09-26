import EleUI from './element'
import Error from './error'
import Results from './results'
import FromItemInput from './form.item'
import CardFooter from './card.footer'
import Table from './table'
import Select from './select'
import AudioUi from './audio-ui'
import RcCallout from './call-out'
import Form from './form'
const components = [
  Error,
  Results,
  FromItemInput,
  CardFooter,
  Form,
  Table,
  Select,
  AudioUi,
  RcCallout
]

const install = (Vue) => {
  if (install.installed) {
    return
  }

  Vue.use(EleUI)

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
