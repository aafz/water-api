//导入wo.service模块
const {
    getWODetail
} = require('../service/wo.service');

//导入wo.error模块
const {
    woNotExistError, //工单不存在
    woGetError, //获取工单详情失败
} = require('../error/wo.error');

//验证工单存在
const woexist = async (ctx, next) => {
    const { id } = ctx.request.body;
    const res = await getWODetail(id);
    console.log(`wo.middleware.js:${res}`);

    try {
        if (!res) {//res没有返回数据
            console.error('工单不存在', { id });
            ctx.app.emit('error', woNotExistError , ctx);
            return
        }
    } catch (err) {
        console.error(err)
        ctx.app.emit('error', woGetError, ctx);
        return
    }

    await next();
}

module.exports = {
    woexist,
}