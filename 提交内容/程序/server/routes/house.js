var express = require('express');
var router = express.Router();
var mysqlPoll = require('../database/mysql.poll');
var sql = require('../database/sql').house;
var json = require('../database/json');

var auth = require('../lib/auth');
var util = require('../lib/util');
var lease = require('./lease');
var sale = require('./sale');
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
        if (params.isSale === '是') {
          sale.publishSaleHouse(res, result.insertId)
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

    if (params.isSale === '是') {
      lease.publishSaleHouse(res, params.id)
    } else {
      lease.deleteSaleHouseInfo(res, params.id)
    }

    json(res, result, '信息修改成功')
  })

});
// 设置是否出租
router.post('/setIsLease', function(req, res, next) {
  let params = req.body || {};
  console.log(params.id)
  // UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
  console.log('params.isLease', params.isLease)
  let sqlQuery = [params.isLease, params.houseId]
  mysqlPoll.queryArgs(res, sql.setIsLease, sqlQuery, function(result) {
    if (params.isLease === '是') {
      lease.publishLeaseHouse(res, params.id)
    } else {
      lease.deleteLeaseHouseInfo(res, params.id)
    }
    json(res, result, '不再出租')
  })

});

// 设置是否出售
router.post('/setIsSale', function(req, res, next) {
  let params = req.body || {};
  console.log(params.id)
  let sqlQuery = [params.isSale, params.houseId]
  mysqlPoll.queryArgs(res, sql.setIsSale, sqlQuery, function(result) {
    if (params.isSale === '是') {
      sale.publishSaleHouse(res, params.id)
    } else {
      sale.deleteSaleHouseInfo(res, params.id)
    }
    json(res, result, '不再出售')
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
    lease.deleteLeaseHouseInfo(res, params.id)
    sale.deleteSaleHouseInfo(res, params.id)
    json(res, result, '信息删除成功')
  })
});

module.exports = router;
