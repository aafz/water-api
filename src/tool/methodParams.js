//根据不同的方法抽取参数
//参数：ctx.request 传入需要抽取的参数
function getParams(ctx,par) {
    let params;
    let request = ctx.request;
    let method = request.method;
    if (method == 'GET') {
        params = request.url.split('/');
        console.log(params);
        params = params[params.length - 1];
    } else if (method == 'PATCH' || 'POST') {
        params = request.body[par];
    } else {
        //报一个没有此方法的错（要不再加一个文件名）
        console.error('没有这个方法提供');
        ctx.app.emit('error', woGetError, ctx);
        return
    }
    return params;
}


module.exports = {
    getParams,
}