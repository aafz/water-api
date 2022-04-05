//导入inspection.service模块
const { getInsDetail} = require('../service/inspection.service');

//导入inspection.error模块
const { insGetError, insNotExistError} = require('../error/inspection.error');

//验证巡检任务存在 
const insExisted = async (ctx, next) => {
    //获取参数
    const url=ctx.request.url.split('/');
    const id=url[url.length-1];
    // console.log();

    const res = await getInsDetail(id);

    try {
        if (!res) { //res没有返回数据
            console.error('巡检任务不存在', { id });
            ctx.app.emit('error', insNotExistError, ctx);
            return
        }
    } catch (err) {
        console.error(err)
        ctx.app.emit('error', insGetError, ctx);
        return
    }

    await next();
}

module.exports = {
    insExisted
}