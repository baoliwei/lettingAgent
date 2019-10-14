var express = require('express');
var router = express.Router();
var mysqlPoll = require('../database/mysql.poll');
var sql = require('../database/sql').house;
var json = require('../database/json');

var auth = require('../lib/auth');
var util = require('../lib/util');
var lease = require('./lease');
// module.exports = {
//   router,
//   deleteLeaseHouseInfo,
//   publishLeaseHouse
// };

// function () {

// }

// 添加房源
router.post('/publishHouse', function(req, res, next) {
  let params = req.body || {};
  mysqlPoll.queryArgs(res, sql.insert, 
    [params.name, params.addr, params.style, params.area,
      params.propertyRight, params.propertyOwer, params.type, params.isSun, params.isNew,
      params.contactInformation, params.isLease, params.isSale], function(result) {
        console.log('aaaaaaaaaaa', params.isLease )
        if (params.isLease === '是') {
          lease.publishLeaseHouse(res, result.insertId)
        }
      console.log('ssssssssssssssssss', result)
      json(res, result, '发布成功')
  })
});

// 修改信息
router.post('/modifyInfo', function(req, res, next) {
  let params = req.body || {};
  console.log(params.id)
  // UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
  let sqlQuery = [params.name, params.addr, params.style, params.area,
    params.propertyRight, params.propertyOwer, params.type, params.isSun, params.isNew,
    params.contactInformation, params.isLease, params.isSale, params.id, params.id]
  mysqlPoll.queryArgs(res, sql.update(params.isLease, params.isSale), sqlQuery, function(result) {
    if (params.isLease === '是') {
      lease.publishLeaseHouse(res, params.id)
    } else {
      lease.deleteLeaseHouseInfo(res, params.id)
    }
    json(res, result, '信息修改成功')
  })

});

// 查找权限内的所有用户
router.get('/findAll', auth.userRequired, function(req, res, next) {
  let params = req.query || {};
  let sqlStr = ''; 
  let sqlQuery = [];
  if(req.session.user.type !== 'admin') {
    sqlStr = sql.queryByArgs(req.session.user.id)
    sqlQuery = [req.session.user.id]
    console.log(sqlQuery)
  } else {
    sqlStr = sql.queryByArgs(params.id, params.name, params.style, params.propertyRight, 
      params.propertyOwer, params.type, params.isSun, params.isNew, params.contactInformation, params.isLease, params.isSale)
    sqlQuery = [params.id, params.name, params.style, params.propertyRight, 
      params.propertyOwer, params.type, params.isSun, params.isNew, params.contactInformation, params.isLease, params.isSale]
    sqlQuery = util.removeEmptyArrayEle(sqlQuery)
    console.log('aaaaaaaaaaaaaaaaaaaa', sqlQuery)
  }
  mysqlPoll.queryArgs(res, sqlStr, sqlQuery, function(result) {
    if(result && result.length !== 0) {
      json(res, result, '查询成功')
    } else {
      json(res, result, '暂无数据')
    }
  })
});

// 删除信息
router.post('/deleteHouseInfo', auth.userRequired, function(req, res, next) {
  let params = req.body || {};
  console.log(params.id)
  // UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
  let sqlQuery = [params.id]
  mysqlPoll.queryArgs(res, sql.delete, sqlQuery, function(result) {
    json(res, result, '信息删除成功')
  })
});

module.exports = router;
