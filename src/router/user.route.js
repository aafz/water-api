const Router = require('koa-router');

const { loginNotNull, userExisted, pwdRight } = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.midleware')

const { login,changePWD, changeUserMessage,getUserMessage } = require('../controller/user.control');

const router = new Router({ prefix: '/user' });

//在这里调用了校验的中间件

//登录接口     //做登录需要验证 1.传输的内容不为空 2.账号存在
router.post('/login', loginNotNull, userExisted, pwdRight, login);

//修改密码接口     //1.auth 登录认证  2.加密  3.旧密码匹配正确    4.更改新密码
router.patch('/changePWD',auth,pwdRight,changePWD);

//获取用户信息接口
// router.get('/getMessage',auth,getUserMessage);
//使用auth中间件的话必须携带token，但是get方法。。。。。。
router.get('/getMessage',auth,getUserMessage);     //带token

//修改用户信息接口
router.patch('/changeMessage',auth,changeUserMessage);  //带token？


module.exports = router;
// module.exports = router.routes()