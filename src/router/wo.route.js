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

//导入wo中间件
const {
    woexist,

} = require('../middleware/wo.middleware');

const router = new Router({ prefix: '/wo' });

//在这里调用了校验的中间件

// 1.合法性     内容为空（交给前端处理？）
// 2.合理性     判断工单存在    判断账号存在    用户匹配（规定是某个用户对工单能进行操作）

//增加工单  1.验证用户是否存在  2.验证用户是否有权限(这个可能不用了)  3.
router.post('/addWO', userExisted,addwo);

//修改/提交工单   判断工单存在 修改工单 
router.patch('/changeWO', woexist,changewo);

//获取单项工单详情      1.判断工单存在  2.工单处理人是否为当前用户  3.操作数据库获取工单详情
//************************************2.管理员的话那岂不是全部工单都要看？
router.get('/getWO/:id', woexist,getwodetail);

//获取个人的工单列表    1.验证个人存在 2.工单处理人是否为当前用户 3.操作数据库获取wo
router.get('/getPersonWOs/:tel',userExisted,getwolist);


module.exports = router;