import {
  Button,
  ButtonGroup,
  Select,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Popover,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Dialog,
  Alert,
  Progress,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Option,
  OptionGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Upload,
  Tooltip,
  Cascader,
  Card,
  Tag,
  Collapse,
  CollapseItem,
  Footer,
  Breadcrumb,
  BreadcrumbItem,
  Loading,
  MessageBox,
  Message,
  Notification,
  Carousel,
  CarouselItem
} from 'element-ui'

const components = [
  Button,
  ButtonGroup,
  Progress,
  Select,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Popover,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Dialog,
  Alert,
  Footer,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Option,
  OptionGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Upload,
  Tooltip,
  Cascader,
  Card,
  Tag,
  Collapse,
  CollapseItem,
  Footer,
  Breadcrumb,
  BreadcrumbItem,
  Carousel,
  CarouselItem
]

const install = (Vue) => {
  if (install.installed) {
    return
  }

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.$loading = Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.$alert = Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
}

export default {
  install
}
