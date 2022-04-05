//导入site.error模块
const {
    siteNotExist,
    siteChangeStatusError,
    siteGetListError,
    siteGetDetailError,
} = require('../error/site.error');

//导入site.service模块
const {
    getSiteList,
    getSiteDetailbyID,
    updateSiteStatus,
} = require('../service/site.service');

// 对数据库的查询结果进行逻辑处理返回

class siteControl {

    // 1.获取请求传来的数据
    // 2.操作数据库
    // 3.返回执行数据库的结果并进行判断

    //获取站点列表
    async getsitelist(ctx, next) {
        try {
            const res = await getSiteList();

            ctx.body = {
                code: 0,
                message: '获取站点列表成功',
                result: res,
            }

        } catch (err) {
            console.error('获取站点列表失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', siteGetListError, ctx);
            return
        }

        await next();
    }

    //获取站点详情
    async getsitedetail(ctx, next) {
        try {
            //解析传参s
            const id = ctx.request.url.split('/');
            // console.log(id[id.length - 1]);
            id = id[id.length - 1];
            const res = await getSiteDetailbyID(id);
            
            ctx.body = {
                code: 0,    
                message: '获取站点详情成功',
                result: res,
            }
        } catch (err) {
            console.error('获取站点详情失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', siteGetDetailError, ctx);
            return
        }

        await next();
    }


    //更新站点状态
    async changesitestatus(ctx, next) {
        try {
            //解析传参
            const {id,status} = ctx.request.body;
            // console.log(ctx.request.body);
            const res = await updateSiteStatus(id,status);

            ctx.body = {
                code: 0,
                message: '更新站点状态成功',
                result: '',
            }
        } catch (err) {
            console.error('更新站点状态失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', siteChangeStatusError, ctx);
            return
        }

        await next();
    }
}

module.exports = new siteControl()