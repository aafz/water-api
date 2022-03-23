const {Sequelize} = require('sequelize');

const{
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require('../config/config_default.js');
//取出这里的配置

const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,
    dialect:'mysql',
    port:MYSQL_PORT,
});
// 配置mysql的sequelize连接

//  seq.authenticate()
// // 进行连接
// .then(()=>{
//     console.log('connect to MySQL water success   数据库连接成功');
// }).catch((err)=>{
//     console.log('数据库连接失败');
//     console.log(err);
// })
// 测试链接成功

module.exports =  seq;