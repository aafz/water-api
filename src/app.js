const Koa = require('koa');

const {APP_PORT} = require('./config/config_default.js');


const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(APP_PORT,()=>{
    console.log(`running on ${APP_PORT}`);
});