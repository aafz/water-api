module.exports = (err, ctx) => {
    let status = 500;

    //这种方式的话可能还是按照错误的类型进行分类更好：合法性/合理性/数据错误/数据库查询错误

    switch (err.code) {
        //根据code的数字进行条件判断返回错误处理status
        case 10001:
            status = 400;
            break;
        case 10002:
            status = 409;
            break;
        default:
            status = 500;
            break;

        //先暂时这样，到时候再改
    }

    ctx.status = status;
    ctx.body = err;
    console.log(err);
}
