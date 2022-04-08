const Router = require('koa-router');

//导入wo控制器模块
const { 
    addwo,
    getwolist,
    getwodetail,
    changewo,
} = require('../controller/wo.control');

//导入user中间件模块
const { userExisted } = require('../middleware/user.middleware');

//导入auth中间件模块
const { auth } = require('../middleware/auth.midleware');

//导入wo中间件
const {
    woexist,

} = require('../middleware/wo.middleware');

const router = new Router({ prefix: '/wo' });

//在这里调用了校验的中间件

// 1.合法性     内容为空（交给前端处理？）
// 2.合理性     判断工单存在    判断账号存在    用户匹配（规定是某个用户对工单能进行操作）

//增加工单  1.验证用户是否存在  2.验证用户是否有权限(这个可能不用了)  3.//tel从token中取值
router.post('/addWO', auth,userExisted,addwo);

//修改  //提交工单和分派工单都可以用   判断工单存在 修改工单 3.//tel从token中取值
router.post('/changeWO', auth,woexist,changewo);

//获取单项工单详情      1.判断工单存在  2.工单处理人是否为当前用户  3.操作数据库获取工单详情
//************************************2.管理员的话那岂不是全部工单都要看？
// router.get('/getWO/:id',auth, woexist,userTypeCheck,getwodetail);
router.get('/getWO/:id', woexist,getwodetail);

//获取个人的工单列表    -1.auth中间件验证token  1.验证个人存在 2.工单处理人是否为当前用户 3.操作数据库获取wo  //tel从token中取值
router.get('/getPersonWOs',auth,userExisted,getwolist);


module.exports = router;