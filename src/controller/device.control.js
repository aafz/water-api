//导入device.error模块
const { deviceGetListError, deviceGetDetailError
} = require('../error/device.error');

//导入device.service模块
const {
    getDeviceList, getDevDetailbyID
} = require('../service/device.service');

class siteControl {

    //获取站点设备列表
    async getDevList(ctx, next) {
        try {
            //解析传参
            const site_id = ctx.params.site_id;
            console.log(site_id);
            // const site_id = ctx.request.url.split('/'); //这个无法从token中获取其他信息
            const res = await getDeviceList(site_id);
            ctx.body = {
                code: 0,
                message: '获取站点设备列表成功',
                result: res,
            }
        } catch (err) {
            console.error('获取站点设备列表失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', deviceGetListError, ctx);
            return
        }
        await next();
    }

    //获取设备详情
    async getDevDetail(ctx, next) {
        try {
            //解析传参
            const dev_id = ctx.params.dev_id;
            console.log(dev_id);
            // const id = ctx.request.url.split('/');
            // id = id[id.length - 1];
            const res = await getDevDetailbyID(dev_id);

            ctx.body = {
                code: 0,
                message: '获取站点设备详情成功',
                result: res,
            }
        } catch (err) {
            console.error('获取站点设备详情失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', deviceGetDetailError, ctx);
            return
        }

        await next();
    }


    //更新设备状态
    // async changesitestatus(ctx, next) {
    //     try {
    //         //解析传参
    //         const {id,status} = ctx.request.body;
    //         // console.log(ctx.request.body);
    //         const res = await updateSiteStatus(id,status);

    //         ctx.body = {
    //             code: 0,
    //             message: '更新设备状态成功',
    //             result: '',
    //         }
    //     } catch (err) {
    //         console.error('更新设备状态失败'); //这些重复报错太多的，老子迟早抽掉它
    //         ctx.app.emit('error', siteChangeStatusError, ctx);
    //         return
    //     }

    //     await next();
    // }
}

module.exports = new siteControl()