<script>
import RcFormItem from './FormItem'
export default {
  name: 'RcForm',
  components: {
    RcFormItem
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    attr: {
      type: Object,
      default () {
        return {}
      }
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    resetButton: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    hasFooter: {
      type: Boolean,
      default: true
    },
    disabledConfirmBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: this.value || {}
    }
  },
  watch: {
    // 监听value改动之后重新赋值
    value: {
      handler (val) {
        this.formData = val
      },
      deep: true
    }
  },
  methods: {
    sync (value, prop) {
      this.formData[prop] = value
      this.$emit('change', this.formData)
    },
    onConfirm () {
      // 点击确认的回调
      this.$emit('confirm', this.$slots.default)
    },
    onReset () {
      this.$refs.form.resetFields()
      this.$emit('change', this.formData)
    },
    validate (callback) {
      if (typeof callback !== 'function' && window.Promise) {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate((valid) => {
            valid ? resolve(valid) : reject(valid)
          })
        })
      } else {
        return this.$refs.form.validate(callback)
      }
    },
    validateField (prop) {
      this.$refs.form.validateField(prop)
    },
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
    renderFormItem () {
      const items = []
      this.data.forEach(item => {
        items.push(
          <rc-form-item data={item} inline={this.attr.inline} onInput={(value) => this.sync(value, item.prop)} value={this.formData[item.prop]}></rc-form-item>
        )
      })

      return items
    },
    renderFormFooter () {
      return (
        <el-form-item class="rc-form__footer">
          <el-button size="small" type="primary" onClick={this.onConfirm} disabled={this.disabledConfirmBtn}>{this.confirmButtonText}</el-button>
          {
            this.resetButton && <el-button size="small" onClick={this.onReset}>重置</el-button>
          }
          { this.$slots.footer }
        </el-form-item>
      )
    }
  },
  render (h) {
    const prop = {
      attr: this.attr,
      on: this.on,
      nativeOn: this.nativeOn,
      class: this.class,
      style: this.style
    }
    const attr = this.parseComponentAttr(prop)

    return (
      <div class="rc-form">
        <el-form
          ref="form"
          model={this.formData}
          rules={this.rules}
          size="small"
          {...attr}
        >
          { this.data.length && this.renderFormItem() }
          { this.hasFooter && this.renderFormFooter() }
          { this.$slots.default && this.$slots.default }
        </el-form>
      </div>
    )
  }
}
</script>

<style lang="scss">
@include b(form) {
width: 100%;

@include e(item-inline) {
  display: inline-block;
}

@include e(item-block) {
  display: block !important;
}
}
</style>
