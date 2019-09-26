//json.js
//封装接送模块
var json = function(res, result, msg) {
    if (typeof result === 'undefined') {
        res.json({
            status: 1,
            msg: '操作失败'
        });
    } else {
        res.json({
            status: 0,
            msg: msg,
            result: result
        });
    }
};
module.exports = json;
