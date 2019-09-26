export const FORM_DATA = [
  {
    prop: 'name',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '姓名', clearable: true }
  },
  {
    prop: 'IDCard',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '身份证', clearable: true }
  },
  {
    prop: 'username',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '用户昵称', clearable: true }
  },
  {
    prop: 'type',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '用户类型', clearable: true, filterable: true },
    async asyncData () {
      return {
        'admin': '0',
        'customer': '1',
        'sale': '2',
      }
    }
  },
]

export const COLUMNS = function () {
  return [
    {
      prop: 'name',
      label: '姓名',
      'min-width': 120,
      align: 'center',
      'show-overflow-tooltip': true
    },
    {
      prop: 'username',
      label: '用户昵称',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'IDCard',
      label: '身份证',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'sex',
      label: '性别',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'age',
      label: '年龄',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    },
    {
      prop: 'type',
      label: '用户类型',
      'min-width': 100,
      align: 'center',
      'show-overflow-tooltip': true,
    }
  ]
}
