var express = require('express');
var router = express.Router();
var mysqlPoll = require('../database/mysql.poll');
var sql = require('../database/sql').house;
var json = require('../database/json');

var auth = require('../lib/auth');
var util = require('../lib/util');

// 添加房源
router.post('/publishHouse', function(req, res, next) {
  let params = req.body || {};
  mysqlPoll.queryArgs(res, sql.insert, 
    [params.name, params.addr, params.style, params.area,
      params.propertyRight, params.propertyOwer, params.type, params.isSun, params.isNew,
      params.ContactInformation, params.isLease, params.isSale], function(result) {
    json(res, result, '发布成功')
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
    sqlStr = sql.queryByArgs(params.id, params.name, params.style, params.propertyRight, 
      params.propertyOwer, params.type, params.isSun, params.isNew, params.ContactInformation, params.isLease, params.isSale)
    sqlQuery = [params.id, params.name, params.style, params.propertyRight, 
      params.propertyOwer, params.type, params.isSun, params.isNew, params.ContactInformation, params.isLease, params.isSale]
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
