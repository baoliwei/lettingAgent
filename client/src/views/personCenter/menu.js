export default {
  name: '个人中心',
  icon: 'el-icon-menu',
  index: 6,
  key: '6-person',
  path: '/new/',
  rule: '',
  children: [
    {
      index: 1,
      path: '/lease/list?source=person',
      name: '我申领的出租房源',
      icon: '',
      rule: '',
      key: '6-1',
    },
    {
      index: 1,
      path: '/sale/list?source=person',
      name: '我申领的出售房源',
      icon: '',
      rule: '',
      key: '6-2',
    },
    {
      index: 1,
      path: '/user/list?source=person',
      name: '个人信息',
      icon: '',
      rule: '',
      key: '6-3',
    },
    {
      index: 1,
      path: '/house/list?source=person',
      name: '我发布的房源',
      icon: '',
      rule: '',
      key: '6-4',
    },
    {
      index: 1,
      path: '/new/aftersale/list/total',
      name: '修改密码',
      icon: '',
      rule: '',
      key: '6-1',
    }
  ]
}
