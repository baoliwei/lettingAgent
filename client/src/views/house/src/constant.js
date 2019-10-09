// 列表查询条件 房屋名称 户型 是否朝阳 房屋类型 是否新房 是否出租 是否出售 产权 联系方式
// name: '',
// style: '',
// propertyRight: '',
// propertyOwer: '',
// type: '',
// isSun: '',
// isNew: '',
// ContactInformation: '',
// isLease: '',
// isSale: ''
export const FORM_DATA = [
  {
    prop: 'name',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '房屋名称', clearable: true }
  },
  {
    prop: 'style',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '户型', clearable: true }
  },
  {
    prop: 'propertyRight',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '产权', clearable: true }
  },
  {
    prop: 'propertyOwer',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '产权人', clearable: true }
  },
  {
    prop: 'type',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '房屋类型', clearable: true }
  },
  {
    prop: 'isSun',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否朝阳', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否',
      }
    }
  },
  {
    prop: 'isNew',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否新房', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否',
      }
    }
  },
  {
    prop: 'isLease',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否出租', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否',
      }
    }
  },
  {
    prop: 'isLease',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否出售', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否',
      }
    }
  },
  {
    prop: 'ContactInformation',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '联系方式', clearable: true }
  },
]

// name: '',
// style: '',
// propertyRight: '',
// propertyOwer: '',
// type: '',
// isSun: '',
// isNew: '',
// ContactInformation: '',
// isLease: '',
// isSale: ''
export const COLUMNS = function () {
  const _this = this
  return [
    {
      prop: 'name',
      label: '姓名',
      'min-width': 120,
      align: 'center',
      'show-overflow-tooltip': true
    },
    {
      prop: 'style',
      label: '户型',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'propertyRight',
      label: '产权',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'propertyOwer',
      label: '产权人',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'type',
      label: '房屋类型',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'isSun',
      label: '是否朝阳',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'isNew',
      label: '是否新房',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'isLease',
      label: '是否出租',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'isSale',
      label: '是否出售',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'ContactInformation',
      label: '联系方式',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      label: '操作',
      align: 'center',
      fixed: 'right',
      'min-width': 110,
      render (h, scope) {
        return (
          <div>
            <el-button type="text" class="primary" onClick={_this.modifyInfo.bind(_this, scope.row)}>修改资料</el-button>
            <el-button type="text" class="primary" onClick={_this.deleteInfo.bind(_this, scope.row)}>删除资料</el-button>
          </div>
        )
      }
    }
  ]
}
// name, addr, style, area, propertyRight, propertyOwer, type, isSun, ContactInformation
export const DETLAIL_FORM_DATA = [
  {
    prop: 'name',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '房屋名称', clearable: true }
  },
  {
    prop: 'addr',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '房屋地址', clearable: true }
  },
  {
    prop: 'style',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '户型', clearable: true }
  },
  {
    prop: 'isSun',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否朝阳', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否'
      }
    }
  },
  {
    prop: 'type',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '房屋类型', clearable: true }
  },
  {
    prop: 'isNew',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否新房', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否'
      }
    }
  },
  {
    prop: 'isLease',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否出租', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否'
      }
    }
  },
  {
    prop: 'isSale',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '是否出售', clearable: true, filterable: true },
    async asyncData () {
      return {
        '是': '是',
        '否': '否'
      }
    }
  },
  {
    prop: 'score',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '房屋评分', clearable: true }
  },
  {
    prop: 'propertyRight',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '产权', clearable: true }
  },
  {
    prop: 'propertyOwer',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '产权人', clearable: true }
  },
  {
    prop: 'ContactInformation',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '联系方式', clearable: true }
  },
]
