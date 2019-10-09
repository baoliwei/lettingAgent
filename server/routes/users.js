var express = require('express');
var router = express.Router();
var mysqlPoll = require('../database/mysql.poll');
var sql = require('../database/sql').user;
var json = require('../database/json');

var auth = require('../lib/auth');
var util = require('../lib/util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login', function(req, res, next) {
  let params = req.body || {};
  if (!params.username || !params.password) {
    json(res, '', '用户名或密码不能为空')
  }
  mysqlPoll.queryArgs(res, sql.login, [params.username, params.password], function(result) {
    if(result && result.length !== 0) {
      auth.gen_session(result[0], res); // 生成cokkie
      json(res, result[0], '登录成功')
    } else {
      json(res, result[0], '用户名或密码错误')
    }
  })
});

// 获取当前用户
router.get('/currentUser', auth.userRequired, function(req, res, next) {
    json(res, req.session.user, '')
});

// 退出登录
router.post('/logout', function(req, res, next) {
  json(res, result, '退出登录成功')
});

// 注册
router.post('/register', function(req, res, next) {
  let params = req.body || {};
  mysqlPoll.queryArgs(res, sql.insert, [params.username, params.password], function(result) {
    json(res, result, '注册成功')
  })
});

// 修改信息
router.post('/modifyInfo', function(req, res, next) {
  let params = req.body || {};
  console.log(params.id)
  // UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
  let sqlQuery = [params.name, params.sex, params.age, params.IDCard, params.type, params.id]
  mysqlPoll.queryArgs(res, sql.update, sqlQuery, function(result) {
    json(res, result, '信息修改成功')
  })
});

// 查找权限内的所有用户
router.get('/findAll', auth.userRequired, function(req, res, next) {
  let params = req.params || {};
  let sqlStr = ''; 
  let sqlQuery = [];
  
  if(req.session.user.type !== 'admin') {
    sqlStr = sql.queryByArgs(req.session.user.id)
    sqlQuery = [req.session.user.id]
    console.log(sqlQuery)
  } else {
    sqlStr = sql.queryByArgs(params.id, params.name, params.username, params.IDCard, params.type)
    sqlQuery = [params.id, params.name, params.username, params.IDCard, params.type]
    sqlQuery = util.removeEmptyArrayEle(sqlQuery)
  }
  mysqlPoll.queryArgs(res, sqlStr, sqlQuery, function(result) {
    if(result && result.length !== 0) {
      json(res, result, '查询成功')
    } else {
      json(res, result, '暂无数据')
    }
  })
});

module.exports = router;
