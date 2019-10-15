<script>
import { isFunction } from '@rrc/utils'

export default {
  name: 'RcFormItem',
  props: {
    value: {
      type: [String, Number, Object, Boolean, Array, Date]
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      asyncData: null
    }
  },
  async created () {
    const { prop, label, asyncData } = this.data
    if (prop === undefined) {
        console.error(`检索条件: ${label} 还未设置 prop 属性会导致意想不到的错误。`) // eslint-disable-line
    }
    // 组件动态数据 下拉框 等使用
    this.asyncData = isFunction(asyncData) ? await asyncData(this.data) : []
  },
  methods: {
    // 处理组件赋值
    sync (value) {
      this.$emit('input', value)
    },
    // 格式化组件属性 到 vue jsx 识别的属性
    parseComponentAttr (prop = {}) {
      const attr = prop.attr || {}
      const on = prop.on || {}
      const nativeOn = prop.nativeOn || {}
      const rcClass = prop.class || {}
      const rcStyle = prop.style || {}

      const attribute = {
        // component props
        props: {
          ...attr
        },
        // component event
        on: {
          ...on
        },
        nativeOn: {
          ...nativeOn
        },
        class: {
          ...rcClass
        },
        style: {
          ...rcStyle
        }
      }
      return attribute
    },
    // 渲染日期组件
    renderDatePicker (prop) {
      const attr = this.parseComponentAttr(prop)
      return (
        <el-date-picker
          value={this.value}
          onInput={this.sync}
          {...attr}>
        </el-date-picker>
      )
    },
    renderSelect (prop) {
      const attr = this.parseComponentAttr(prop)
      return (
        <rc-select
          data={this.asyncData}
          onInput={this.sync}
          value={this.value}
          {...attr}>
        </rc-select>
      )
    },
    renderInput (prop) {
      const attr = this.parseComponentAttr(prop)
      attr.attrs = attr.props
      return (
        <el-input
          value={this.value}
          onInput={this.sync}
          {...attr} >
        </el-input>
      )
    },
    // 渲染 级联选择器
    renderCascader (prop) {
      const attr = this.parseComponentAttr(prop)
      return (
        <el-cascader
          options={this.asyncData || []}
          onInput={this.sync}
          value={this.value}
          {...attr}>
        </el-cascader>
      )
    },
    renderRadio (prop) {
      const attr = this.parseComponentAttr(prop)
      let radioOption = []
      radioOption = prop.asyncData && prop.asyncData()

      const radioDom = []
      radioOption.forEach(item => {
        const itemAttr = this.parseComponentAttr(item)
        radioDom.push(
          <el-radio label={item.value} {...itemAttr}>{item.label}</el-radio>
        )
      })

      return (
        <el-radio-group
          onInput={this.sync}
          value={this.value}
          {...attr}>
          {radioDom}
        </el-radio-group>
      )
    },
    renderCheckbox (prop) {
      const attr = this.parseComponentAttr(prop)
      let checkboxOption = []
      checkboxOption = prop.asyncData && prop.asyncData()
      const checkboxDom = []
      checkboxOption.forEach(item => {
        const itemAttr = this.parseComponentAttr(item)
        checkboxDom.push(
          <el-checkbox label={item.value} {...itemAttr}>{item.label}</el-checkbox>
        )
      })

      return (
        <el-checkbox-group
          onInput={this.sync}
          value={this.value}
          {...attr}>
          {checkboxDom}
        </el-checkbox-group>
      )
    },
    renderInputNumber (prop) {
      const attr = this.parseComponentAttr(prop)
      return (
        <el-input-number
          value={this.value}
          onInput={this.sync}
          {...attr}>
        </el-input-number>
      )
    },
    renderSwitch (prop) {
      const attr = this.parseComponentAttr(prop)
      return (
        <el-switch
          value={this.value}
          onInput={this.sync}
          {...attr}>
        </el-switch>
      )
    },
    renderComponent (prop, h) {
      const { renderComponent } = prop
      if (isFunction(renderComponent)) {
        return renderComponent(h, this, prop)
      }
      /* eslint-disable vue/script-indent */
      switch (prop.type) {
        case 'select':
          return this.renderSelect(prop)
        case 'datePicker':
          return this.renderDatePicker(prop)
        case 'cascader':
          return this.renderCascader(prop)
        case 'radio':
          return this.renderRadio(prop)
        case 'checkbox':
          return this.renderCheckbox(prop)
        case 'inputNumber':
          return this.renderInputNumber(prop)
        case 'switch':
          return this.renderSwitch(prop)
        default:
          return this.renderInput(prop)
      }
      /* eslint-enable */
    }
  },
  render (h) {
    let itemClass = ''
    if (this.data.attr && typeof this.data.attr.inline !== 'undefined' && this.inline) {
      itemClass = !this.data.attr.inline ? 'rc-form__item-block' : ''
    } else if (this.data.attr && typeof this.data.attr.inline !== 'undefined' && !this.inline) {
      itemClass = this.data.attr.inline ? 'rc-form__item-inline' : ''
    }
    return (
      <el-form-item
        label={this.data.label}
        prop={this.data.prop}
        rules={this.data.rules}
        class={itemClass}>
        {this.renderComponent(this.data, h)}
      </el-form-item>
    )
  }
}
</script>
