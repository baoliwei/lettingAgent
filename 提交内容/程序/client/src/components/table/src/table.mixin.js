export default {
  data () {
    return {
      rcTableSelectionList: [],
      // onTable定义了rc-table组件的on-table属性。
      // 如果在引用该文件的组件内希望使用onTable，如下使用 <rc-table :on-table="$rcTableOn"></rc-table>即可。
      rcTableOn: {
        'selection-change': this.$rcTableSelectionChange.bind(this)
      }
    }
  },
  computed: {
    // 给用户使用
    $rcTableSelections: {
      set (selections) {
        this.rcTableSelectionList = selections
      },
      get () {
        return this.rcTableSelectionList
      }
    }
  },
  methods: {
    // 在引用该文件的组件内定义该方法，即可覆盖本函数。
    $rcTableSelectionChange (selections) {
      this.$rcTableSelections = selections
    },
    // 搜索
    $onSearch (id = 'table') {
      this.$refs[id].onSearch()
    }
  }
}
