export default [
  {
    name: 'findAllLeaseHouse',
    url: '/lease/findAll',
    method: 'get',
    description: '查询所有符合条件的房源',
  },
  {
    name: 'modifyLeaseHouseInfo',
    url: '/lease/setIsLease',
    method: 'post',
    description: '修改出租管理信息',
  }
]
