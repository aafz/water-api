const ET = require('./ET');

const insGetPersonError = new ET('20001', '获取个人巡检列表失败');
const insGetError = new ET('20002', '获取单项巡检详情失败');
const insNotExistError = new ET('20003', '巡检任务不存在');


//导出上面的错误对象
module.exports = {
    insGetPersonError,
    insGetError,
    insNotExistError,
};