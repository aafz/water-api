const Router = require('koa-router');

// 导入site控制器模块
const {
    getsitelist,
    getsitedetail,
    changesitestatus,
} = require('../controller/site.control');

//导入auth控制器模块
const {auth} = require('../middleware/auth.midleware');

//导入user中间件模块
const {IsTester} = require('../middleware/user.middleware');

const router = new Router({ prefix: '/site' });

// 1.合法性     内容为空（交给前端处理？）
// 2.合理性     

// 获取站点列表
router.get('/getSiteList',getsitelist);

//获取单个站点详情  判断站点存在
router.get('/getSiteDetail/:id',getsitedetail);

//修改站点状态（测试人员专享） //根据token判断是否为测试人员    // 判断站点存在   //修改站点状态
router.post('/changeSiteStatus',auth,IsTester,changesitestatus); //带token

module.exports = router;