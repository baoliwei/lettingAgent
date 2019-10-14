var express = require('express');
var router = express.Router();
var mysqlPoll = require('../database/mysql.poll');
var sql = require('../database/sql').lease;
var json = require('../database/json');

var auth = require('../lib/auth');
var util = require('../lib/util');

// 添加出租房源
router.post('/publishLeaseHouse', function(req, res, next) {
  let params = req.body || {};
  publishLeaseHouse(res, params.houseId)

});

function publishLeaseHouse(res, id, cb) { // 添加出租房源
  mysqlPoll.queryArgs(res, sql.selectByHouseId, 
    [id], function(result) {
      if (result && result.length === 0) { // 如果不存在数据
        mysqlPoll.queryArgs(res, sql.insert, 
          [id], function(result) {
            cb && cb();
        })
      }
  })
  
}

// 修改信息
router.post('/modifyInfo', function(req, res, next) {
  let params = req.body || {};
  console.log(params.id)
  // UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?
  let sqlQuery = [params.name, params.addr, params.style, params.area,
    params.propertyRight, params.propertyOwer, params.type, params.isSun, params.isNew,
    params.contactInformation, params.isLease, params.isSale, params.id]
  mysqlPoll.queryArgs(res, sql.update, sqlQuery, function(result) {
    json(res, result, '信息修改成功')
  })
});

// 查找权限内的所有用户
router.get('/findAll', auth.userRequired, function(req, res, next) {
  let params = req.query || {};
  let sqlStr = ''; 
  let sqlQuery = [];
  // id, name, style, isSun, type, isNew, propertyRight
  sqlStr = sql.queryByArgs(params.id, params.name, params.style, params.isSun, params.type, params.isNew, params.propertyRight)
  sqlQuery = [params.id, params.name, params.style, params.isSun, params.type, params.isNew, params.propertyRight]
  sqlQuery = util.removeEmptyArrayEle(sqlQuery)
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
    deleteLeaseHouseInfo(res, params.id)
});

function deleteLeaseHouseInfo(res, id, cb) {
  let sqlQuery = [id, id]
  console.log('______________', sql.delete)
  mysqlPoll.queryArgs(res, sql.delete, sqlQuery, function() {
    cb && cb();
  })
}

module.exports = {
  router,
  deleteLeaseHouseInfo,
  publishLeaseHouse
};
