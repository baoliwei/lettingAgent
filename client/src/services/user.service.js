export default [
  {
    name: 'register',
    url: '/users/register',
    method: 'post',
    description: '注册',
  },
  {
    name: 'login',
    url: '/users/login',
    method: 'post',
    description: '登录',
  },
  {
    name: 'getList',
    url: '/users/findAll',
    method: 'get',
    description: '用户列表',
  },
  {
    name: 'currentUser',
    url: '/users/currentUser',
    method: 'get',
    description: '获取当前用户',
  },
  {
    name: 'modifyUserInfo',
    url: '/users/modifyInfo',
    method: 'post',
    description: '修改资料',
  },
  {
    name: 'deleteUserInfo',
    url: '/users/deleteUserInfo',
    method: 'post',
    description: '删除资料',
  },
]
