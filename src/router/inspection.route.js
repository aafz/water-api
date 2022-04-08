const Router = require('koa-router');

//导入auth中间件模块
const { auth } = require('../middleware/auth.midleware');

//导入wo中间件
// const { woexist} = require('../middleware/wo.middleware');

//导入inspection中间件
const {insExisted} = require('../middleware/inspect.modleware.js');

//导入inspection控制器模块
const {getinslist,getinsdetail} = require('../controller/inspection.control');

const router = new Router({ prefix: '/inspect' });

//增加巡检任务  //这个应该是由管理员来添加的 //暂时不写吧

//修改巡检任务  //暂时不写

//获取个人巡检任务列表    
router.get('/getPersonInsList',auth,getinslist);

//获取单项巡检任务详情
router.get('/getInspect/:id',insExisted,getinsdetail);

module.exports = router;