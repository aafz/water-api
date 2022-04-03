const fs = require('fs');

const Router = require('koa-router');
const router = new Router();


// console.log(fs.readdirSync(__dirname))
fs.readdirSync(__dirname).forEach((file) => {
    if (file == 'index.js') {
        return
    }
    let route = require(`./${file}`);
    router.use(route.routes());
})

module.exports = router;