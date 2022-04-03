const Koa = require('koa');
const KoaBody = require('koa-body');

const router = require('../router/index');

const errorHandler  = require('./errorhandle');

const app = new Koa();

app.use(KoaBody())
app.use(router.routes());

app.on('error',errorHandler);   //错误处理监听

module.exports = app