// id, name, style, isSun, type, isNew, propertyRight
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
]

// name: '',
// style: '',
// propertyRight: '',
// propertyOwer: '',
// type: '',
// isSun: '',
// isNew: '',
// contactInformation: '',
// isLease: '',
// isSale: ''
export const COLUMNS = function () {
  const _this = this
  return [
    {
      prop: 'houseId',
      label: '房屋编号',
      'min-width': 120,
      align: 'center',
      'show-overflow-tooltip': true
    },
    {
      prop: 'name',
      label: '房屋名称',
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
      prop: 'money',
      label: '租金',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'startTime',
      label: '租赁开始时间',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'endTime',
      label: '租赁结束时间',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'contactInformation',
      label: '联系方式',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'desc',
      label: '备注',
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
// name, addr, style, area, propertyRight, propertyOwer, type, isSun, contactInformation
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
    prop: 'contactInformation',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '联系方式', clearable: true }
  },
]
