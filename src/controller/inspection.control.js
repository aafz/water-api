//导入ins.error模块
const {insGetPersonError,insGetError} = require('../error/inspection.error');
// const WO = require('../model/wo.model');

//导入ins.service模块
const {getInsList,getInsDetail} = require('../service/inspection.service');

// 对数据库的查询结果进行逻辑处理返回

class insControl {

    // 1.获取请求传来的数据
    // 2.操作数据库
    // 3.返回执行数据库的结果并进行判断


    // 获取个人ins列表by tel  
    async getinslist(ctx, next) {
        try {
            //解析传参
            const tel = ctx.state.user.tel;

            const res = await getInsList(tel);

            ctx.body = {
                code: 0,
                message: '获取个人巡检列表成功',
                result: res,
            }
        } catch (err) {
            console.error('获取个人巡检列表失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', insGetPersonError, ctx);
            return
        }
        await next();
    }

    //获取ins详情
    async getinsdetail(ctx, next) {
        try {
            //解析传参
            let url = ctx.request.url;
            let id = url.slice('/');
            id = id[id.length - 1];
            //这个解析方法不好，后期改进

            const res = await getInsDetail(id);
            ctx.body = {
                code: 0,
                message: '获取巡检详情成功',
                result: res,
            }
        } catch (err) {
            console.error('获取单项巡检详情失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', insGetError, ctx);
            return
        }
        await next();
    }

  
}

module.exports = new insControl()