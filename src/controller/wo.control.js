//导入wo.error模块
const {
    woAddError,
    woDBError,
    woChangeError,
    woGetError,
    woGetPersonError,
} = require('../error/wo.error');
// const WO = require('../model/wo.model');

//导入wo.service模块
const {
    getWOListByTel,
    getWODetail,
    addWO,
    updateWO
} = require('../service/wo.service');

// 对数据库的查询结果进行逻辑处理返回

class woControl {

    // 1.获取请求传来的数据
    // 2.操作数据库
    // 3.返回执行数据库的结果并进行判断

    //添加工单
    async addwo(ctx, next) {
        try {
            //解析传参
            const {
                name,
                level,
                description,
                site_id
            
            } = ctx.request.body;
            // console.log(params);

            const tel = ctx.state.user.tel;

            const WOobj = {
                name: name,
                level: level,
                status: '未派发',
                description: description,
                site_id: site_id,
                submitter_tel: tel
            }
            const res = await addWO(WOobj); //到时候再加上添加工单的参数
            console.log('res:' + res); //成功修改为1 失败为0

            ctx.body = {
                code: 0,
                message: '添加工单成功',
                result: '',
            }

        } catch (err) {
            console.error('添加工单失败', err);
            ctx.app.emit('error', woAddError, ctx);
            return
        }

        await next();
    }

    // 获取个人工单列表by tel  
    async getwolist(ctx, next) {
        try {
            //解析传参
            const tel = ctx.state.user.tel;

            const res = await getWOListByTel(tel);
            console.log(res);
            ctx.body = {
                code: 0,
                message: '获取个人工单列表成功',
                result: res,
            }
        } catch (err) {
            console.error('获取个人工单列表失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', woGetPersonError, ctx);
            return
        }
        await next();
    }

    //获取工单详情
    async getwodetail(ctx, next) {
        try {
            //解析传参
            let url = ctx.request.url;
            let id = url.slice('/');
            id = id[id.length - 1];
            //这个解析方法不好，后期改进
            const res = await getWODetail(id);
            ctx.body = {
                code: 0,
                message: '获取工单详情成功',
                result: res,
            }
        } catch (err) {
            console.error('获取单项工单详情失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', woGetError, ctx);
            return
        }
        await next();
    }

    //修改工单
    async changewo(ctx, next) {
        try {
            //解析传参
            const { id, message } = ctx.request.body;
            const tel =ctx.state.user.tel;
            
            // console.log(id, message,tel);
            //这里还可以在改进之前的解析参数方法

            //这里暂时只用于提交工单，后期可以改进为更多的操作（派发等）
            //这里的tel参数应该用于验证是否是当前工单的提交人

            //派发的话就要先根据路由url判断是否派发或者提交然后来决定传参
            //或者在updateWO里面做，但是这样不科学
            //再想想。。。。。

            const status = '已处理';
            // console.log(`id:${id} tel:${tel} mes:${message}`);

            const res = await updateWO(id, message, status, tel);
            // console.log('ghjkllcxzxchjkl');
            ctx.body = {
                code: 0,
                message: '修改工单成功',
                result: '',
            }
        } catch (err) {
            console.error('修改工单失败'); //这些重复报错太多的，老子迟早抽掉它
            ctx.app.emit('error', woChangeError, ctx);
            return
        }
        await next();
    }
}

module.exports = new woControl()