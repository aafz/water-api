const Router = require('koa-router');

const { login} = require('../controller/user.control');

const router = new Router({ prefix: '/user' });

router.post('/login', login);

module.exports = router