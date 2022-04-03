//校验中间件

const { userFormateError, userNotExit, userLoginError, userInvalidPwd } = require('../error/user.error');

const { getUserInfo } = require('../service/user.service');


//传输内容不为空
const loginNotNull = async (ctx, next) => {

    const { tel, password } = ctx.request.body;
    console.log(tel);
    console.log(password);
    //合法性
    if (!tel || !password) {
        console.error('tel和password为空', ctx.request.body);
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next();
}

//账号真实存在
const userExisted = async (ctx, next) => {
    const { tel } = ctx.request.body;
    const res = await getUserInfo(tel);

    try {
        if (!res) {//res没有返回数据
            console.error('用户不存在', { tel });
            ctx.app.emit('error', userNotExit, ctx);
            return
        }
    } catch (err) {
        console.error(err)
        ctx.app.emit('error', userLoginError, ctx);
        return
    }

    await next();
}

//密码正确匹配
const pwdRight = async (ctx, next) => {
    const { tel, password } = ctx.request.body;
    const res = await getUserInfo(tel);
    try {
        if (password != res.password) {
            console.error('用户账号和密码不匹配/密码错误', { password });
            ctx.app.emit('error', userInvalidPwd, ctx)
            return
        }
    } catch (err) {
        console.error(err);
        ctx.app.emit('error', userLoginError, ctx);
        return
    }
    await next();
};

module.exports = {
    loginNotNull,
    userExisted,
    pwdRight,
}