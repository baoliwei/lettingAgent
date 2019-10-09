export default {
  data () {
    return {
      rcTableselections: [],
      // onTable定义了rc-table组件的on-table属性。
      // 如果在引用该文件的组件内希望使用onTable，如下使用 <rc-table :on-table="onTable"></rc-table>即可。
      onTable: {
        'selection-change': this.onSelectionChange.bind(this)
      }
    }
  },
  computed: {
    // 不选中行时 按钮禁用
    tableSelectedDisable () {
      return this.tableSelections.length <= 0
    },
    tableSelections: {
      set (selections) {
        this.rcTableselections = selections
      },
      get () {
        return this.rcTableselections
      }
    }
  },
  methods: {
    onSelectionChange (selections) { // 在引用该文件的组件内定义该方法，即可覆盖本函数。
      this.tableSelections = selections
    },
    // 搜索
    onSearch (id) {
      this.$nextTick(() => {
        this.$refs[id].onSearch()
      })
    },
    onReset (id) {
      this.$nextTick(() => {
        this.$refs[id].resetFields()
      })
    }
  }
}
