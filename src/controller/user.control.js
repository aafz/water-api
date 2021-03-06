const {
    getUserInfo,
    changebytel
} = require('../service/user.service');
const jwt = require('jsonwebtoken');
const {
    userDBError,
    userChangePWDError,
    userChangeMessageError,
    userGetMessageError,
    userLoginError,
} = require('../error/user.error');
const {
    JWT_SECRET
} = require('../config/config_default.js');

// 对数据库的查询结果进行逻辑处理返回

class userControl {

    async login(ctx, next) {
        const { tel } = ctx.request.body;
        let res;
        try {
           res = await getUserInfo(tel);
        } catch (err) {
            console.error('用户登录失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.status = 500;
            ctx.body = userLoginError;
            ctx.app.emit('error', userLoginError, ctx);
            return
        }
            // 3.返回执行数据库的结果并进行判断    //已经抽到中间件去了
            // 4.颁发token
            const { password, ...userInfo } = res.dataValues;
            ctx.body = { //老子迟早把这些对象抽离出去
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(userInfo, JWT_SECRET, { expiresIn: '2h' })
                }
            }

        await next();
    }

    async changePWD(ctx, next) {
        try {
            const {
                newPWD
            } = ctx.request.body;
            const changeObj = {
                password: newPWD
            };
            const res = await changebytel(ctx.state.user.tel, changeObj)

            // console.log('res:'+res);  //成功修改为1 失败为0
            ctx.body = {
                code: 0,
                message: '密码已更改',
                result: '',
            }

        } catch (err) {
            console.error('密码更改失败', err);
            ctx.app.emit('error', userChangePWDError, ctx);
            return
        }

        await next();
    }

    async changeUserMessage(ctx, next) {

        try {
            const {
                newName,
                newWx,
                newSex
            } = ctx.request.body;
            const changeObj = {
                name: newName,
                wx: newWx,
                sex: newSex
            };
            const res = await changebytel(ctx.state.user.tel, changeObj)

            // console.log('res:'+res);  //成功修改为1 失败为0
            ctx.body = {
                code: 0,
                message: '用户信息已更改',
                result: '',
            }

        } catch (err) {
            console.error('用户信息更改失败', err);
            ctx.app.emit('error', userChangeMessageError, ctx);
            return
        }

        await next();
    }

    async getUserMessage(ctx, next) {

        try {

            // console.log('ctx.state:');
            // console.log(ctx.state);

            const res = await getUserInfo(ctx.state.user.tel);

            //将密码分离出来
            const { password, ...userData } = res.dataValues;

            // console.log('res:'+res);  //成功修改为1 失败为0
            ctx.body = {
                code: 0,
                message: '用户信息获取成功',
                result: userData,
            }

        } catch (err) {
            console.error('用户信息获取失败', err);
            ctx.app.emit('error', userGetMessageError, ctx);
            return
        }

        await next();
    }
}

module.exports = new userControl()