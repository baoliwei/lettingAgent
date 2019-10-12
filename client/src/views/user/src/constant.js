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
        admin: 'admin',
        customer: 'customer',
        sale: 'sale'
      }
    }
  }
]

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
    },
    {
      label: '操作',
      align: 'center',
      fixed: 'right',
      'min-width': 110,
      render (h, scope) {
        // const isViewTransferData = _this.isPermission('aftersale_archives_detail_button')
        return (
          <div>
            <el-button type="text" class="primary" onClick={_this.modifyInfo.bind(_this, scope.row)}>修改资料</el-button>
            <el-button type="text" class="primary" onClick={_this.resetPassword.bind(_this, scope.row)}>重置密码</el-button>
            <el-button type="text" class="primary" onClick={_this.deleteInfo.bind(_this, scope.row)}>删除资料</el-button>
          </div>
        )
      }
    }
  ]
}
// UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
export const DETLAIL_FORM_DATA = [
  {
    prop: 'name',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '姓名', clearable: true }
  },
  {
    prop: 'sex',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '性别', clearable: true }
  },
  {
    prop: 'age',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '年龄', clearable: true }
  },
  {
    prop: 'IDCard',
    type: 'text',
    class: { 'rc-input-w-150': true },
    attr: { placeholder: '身份证', clearable: true }
  },
  {
    prop: 'type',
    type: 'select',
    class: { 'rc-input-w-170': true },
    attr: { placeholder: '用户类型', clearable: true, filterable: true },
    async asyncData () {
      return {
        admin: 'admin',
        customer: 'customer',
        sale: 'sale'
      }
    }
  },
]
