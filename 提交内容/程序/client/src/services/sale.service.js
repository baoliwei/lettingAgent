export default [
  {
    name: 'findAllSaleHouse',
    url: '/sale/findAll',
    method: 'get',
    description: '查询所有符合条件的房源',
  },
  {
    name: 'modifySaleHouseInfo',
    url: '/sale/modifyInfo',
    method: 'post',
    description: '修改出售管理信息',
  },
  {
    name: 'receiveSale',
    url: '/sale/receive',
    method: 'post',
    description: '申领出售管理信息',
  }
]
