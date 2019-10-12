export default [
  {
    name: 'pubilshHouse',
    url: '/house/publishHouse',
    method: 'post',
    description: '发布房源',
  },
  {
    name: 'findAllHouse',
    url: '/house/findAll',
    method: 'get',
    description: '查询所有符合条件的房源',
  },
  {
    name: 'modifyHouseInfo',
    url: '/house/modifyInfo',
    method: 'post',
    description: '修改房源信息',
  },
  {
    name: 'deleteHouseInfo',
    url: '/house/deleteHouseInfo',
    method: 'post',
    description: '删除房源信息',
  },
]
