<script>
import { isFunction } from '@rrc/utils'
export default {
  name: 'RcOption',
  inject: ['select'],
  computed: {
    props () {
      return this.select.props
    }
  },
  methods: {
    renderLabel (h, item) {
      const { render } = item
      if (isFunction(render)) {
        return render(h, item)
      }
      return (
        <span>{item[this.props.label]}</span>
      )
    }
  },
  render (h) {
    const propsValue = this.props.value
    // 绑定值为对象类型 父级select 需要制定value-key
    const hasItem = propsValue === '$item'
    return (
      <i>
        {
          this._l(this.select.rcOptions, (item, index) => {
          // 如果props.value 是$item 则value 是整条数据
            const value = hasItem ? item : item[propsValue]
            return (
              <el-option
                key={`__rc-options-${index}`}
                label={item[this.props.label]}
                value={value}>
                { this.renderLabel(h, item) }
              </el-option>
            )
          })
        }
      </i>
    )
  }
}
</script>
