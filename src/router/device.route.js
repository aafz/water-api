const Router = require('koa-router');

//导入device中间件模块
// const {} = require('../middleware/device.midleware');

//导入token验证中间件
const {auth} = require('../middleware/auth.midleware');

//导入device控制器模块
const {getDevList,getDevDetail} = require('../controller/device.control');


const router = new Router({ prefix: '/device' });  

//获取站点设备列表
router.get('/getDevList/:site_id',auth, getDevList);

//获取设备详细信息
router.get('/getDevDetail/:dev_id', auth,getDevDetail);


module.exports = router;