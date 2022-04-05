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

//在这里调用了校验的中间件

// 1.合法性     内容为空（交给前端处理？）
// 2.合理性     判断工单存在    判断账号存在    用户匹配（规定是某个用户对工单能进行操作）

//增加巡检任务  //这个应该是由管理员来添加的 //暂时不写吧

//修改巡检任务  //暂时不写

//获取个人巡检任务列表    
router.get('/getPersonInsList',auth,getinslist);

//获取单项巡检任务详情
router.get('/getInspect/:id',insExisted,getinsdetail);

module.exports = router;