//校验中间件

const { userFormateError, userTypeError, userNotExit, userLoginError, userInvalidPwd } = require('../error/user.error');

const { getUserInfo, getUserType } = require('../service/user.service');

//抽取参数的函数
const { getParams } = require('../tool/methodParams');

//传输内容不为空
const loginNotNull = async (ctx, next) => {

    const { tel, password } = ctx.request.body;
    console.log(tel);
    console.log(password);
    //合法性
    if (!tel || !password) {
        console.error('tel和password为空', ctx.request.body);
        ctx.status = 400;
        ctx.body = userFormateError;
        // ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next();
}

//账号真实存在
const userExisted = async (ctx, next) => {
    //验证用户

    //从token中获取用户tel
    // const tel = ctx.state.user.tel||ctx.request.body.tel;
    // let tel;
    // console.log(ctx.request.url.indexOf('/login')!=-1);
    // if (ctx.request.url.indexOf('/login') != -1) {
    //     tel = ctx.request.body.tel;
    // } else {
    //     tel = ctx.state.user.tel;
    // }

    const {tel} = ctx.state.user||ctx.request.body;

    // console.log(tel);

    const res = await getUserInfo(tel);


    if (!res) {//res没有返回数据
        console.error('用户不存在', { tel });
        ctx.status = 400;
        ctx.body = userNotExit;
        // ctx.app.emit('error', userNotExit, ctx);
        return
    } 
    // else {
    //     ctx.status = 500;
    //     ctx.body = userLoginError;
    //     ctx.app.emit('error', userLoginError, ctx);
    //     return
    // }

    await next();
}

//密码正确匹配
const pwdRight = async (ctx, next) => {
    //登录与其他方法不一样，没有token，所以不能用ctx.state.user
    const {tel} = ctx.state.user||ctx.request.body;
    const { password } = ctx.request.body;
    const res = await getUserInfo(tel);

    if (password != res.password) {
        ctx.status = 400;
        ctx.body = userInvalidPwd;
        console.error('用户账号和密码不匹配/密码错误', { password });
        return
    }
    // } else {
    //     ctx.status = 500;
    //     ctx.body = userLoginError;
    //     ctx.app.emit('error', userLoginError, ctx);
    //     return
    // };
    await next();
};

//用户类型判断

//判断测试人员
const IsTester = async (ctx, next) => {
    const tel = ctx.state.user.tel;
    const userType = await getUserType(tel);
    // console.log(userType);
    //判断人员类型是否为测试人员
    if (userType === '测试人员') {
        await next();
    } else {
        ctx.body = {
            code: -1,
            message: '您不是测试人员',
            result: ''
        }
        // console.error('用户不是测试人员', { userType });
        // ctx.app.emit('error', userTypeError, ctx);
        return
    }
}

//判断管理员
const IsAdmin = async (ctx, next) => {
    const tel = ctx.state.user.tel;
    const userType = await getUserType(tel);
    // console.log(userType);
    //判断人员类型是否为管理员
    if (userType === '管理员') {
        await next();
    } else {
        console.error('用户不是管理员', { userType });
        ctx.app.emit('error', userTypeError, ctx);
        return
    }
}

module.exports = {
    loginNotNull,
    userExisted,
    pwdRight,
    IsTester,
    IsAdmin,
}