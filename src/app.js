const {APP_PORT} = require('./config/config_default.js');

const app = require('./app/index.js');


app.listen(APP_PORT,()=>{
    console.log(`running on ${APP_PORT}`);
});