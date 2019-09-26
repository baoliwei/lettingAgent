//mysql连接池配置文件
var mysql = require('mysql');
var $dbConfig = require('../config/mysql.config');//注意改成自己项目中mysql配置文件的路径

// 使用连接池，避免开太多的线程，提升性能
var pool = mysql.createPool($dbConfig);

/**
 * 对query执行的结果自定义返回JSON结果
 */
function responseDoReturn(res, result, resultJSON) {
    if (typeof result === 'undefined') {
        res.json({
            status: '201',
            msg: 'failed to do'
        });
    } else {
        res.json(result);
    }
};

/**
 * 封装query之sql带不占位符func
 */
function query(res, sql, callback) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                status: '202',
                msg: '数据库连接失败',
                err: err
            });
        }
        connection.query(sql, function(err, rows) {
            if(err) {
                res.json({
                    status: '201',
                    msg: 'sql执行错误',
                    err: err
                });
            }
            callback(rows);
            //释放链接
            connection.release();
        });
    });
}

/**
 * 封装query之sql带占位符func
 */
function queryArgs(res, sql, args, callback) {
    pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err)
            res.json({
                status: '202',
                msg: '数据库连接失败',
                err: err
            });
            return;
        }
        connection.query(sql, args, function(err, rows) {
            if(err) {
                res.json({
                    status: '201',
                    msg: 'sql执行错误',
                    err: err
                });
                return;
            }
            callback(rows);
            //释放链接
            connection.release();
        });
    });
}

//exports
module.exports = {
    query: query,
    queryArgs: queryArgs,
    doReturn: responseDoReturn
}