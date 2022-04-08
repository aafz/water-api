const jwt = require('jsonwebtoken');
const { authInvalidToken, authOverdueToken } = require('../error/user.error');
const { JWT_SECRET } = require('../config/config_default.js');

//验证token
const auth = async (ctx, next) => {

    const { token } = ctx.request.header;  //从header中获取token
    // console.log(token);

    try {
        var user = jwt.verify(token, JWT_SECRET);

        //将user信息放入ctx.state中
        ctx.state.user = user;


    } catch (err) {
        // console.log(err.name);
        switch (err.name) {
            case 'JsonWebTokenError':
                console.error('无效token', err);
                ctx.status = 401;
                ctx.body=authInvalidToken;
                ctx.app.emit('error',authInvalidToken,ctx);
                return
            case 'TokenExpiredError':
                console.error('token已过期', err);
                ctx.status = 401;
                ctx.body=authOverdueToken;
                ctx.app.emit('error',authOverdueToken,ctx);
                return
            case 'NotBeforeError':
                ctx.status = 500;
                ctx.body={
                    code:-1,
                    msg:'服务器错误'
                };
                console.error('？？？？', err);
                return
        }
        return
    }
    // console.log('auth success');
    await next();
}


module.exports = {
    auth
}
