const { dologin } = require('../service/user.service')

class userControl {
    async login(ctx, next) {
        // 1.获取请求传来的数据
        const { id, password } = ctx.request.body;
        // console.log(ctx.request.body);
        console.log(`user.control.login`);

        // 2.操作数据库
        // await dologin(id, password);
        const res = await dologin(id, password);

        // console.log(res);    //返回的是直接的密码
        // 3.返回执行数据库的结果
        if (res===password) {
            // console.log('login success');
            ctx.body = 'login success';
        } else {
            ctx.body = 'login fail';
        }
    }
}

module.exports = new userControl()