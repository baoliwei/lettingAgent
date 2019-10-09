var mysqlPoll = require('../database/mysql.poll');
var sql = require('../database/sql').user;
var json = require('../database/json');
const auth = {
    // 生成cookie
    gen_session: (user, res) => {
        let auth_user = `${user.id}`;
        res.cookie('token', auth_user, {
            path: '/',
            signed: true,//对cookie密码进行加密的话, 需要使用到cookieParser
            httpOnly: true,
            maxAge: 24*60*60*1000
        });
    },
    authUser: (req, res, next) => {
        //中间件, 所有的请求都要经过它, 我们在这来判断用户的登录情况
        if(req.session.user) {
            next();//用户已经登录情况下, 直接下一步
        }
        else {
            // 需要通过cookie去生成session
            // 1.获取cookie
            let auth_token = req.signedCookies['token'];//cookie-parser直接帮我解密了
            if (!auth_token) {
                next()
            }
            else {
                //2.通过cookie生成session
                let user_id = auth_token;
                console.log('user_id', user_id)
                //数据库去找这个用户ID
                mysqlPoll.queryArgs(res, sql.queryById, [user_id], function(result) {
                    if(result && result.length !== 0) {
                        req.session.user = result[0];
                        next();
                    } else {
                        // res.json({
                        //     status: 401,
                        //     msg: '未登录'
                        // })
                        next()
                    }
                  })
            }
        }
    },
    //判断用户未登录的中间件
    userRequired: (req, res, next) => {
        if(!(req.session && req.session.user && req.session.user.id)) {
            res.json({
                status: 401,
                msg: '未登录'
            })
            return
        } else {
            next();
        }
    }
}

module.exports = auth;