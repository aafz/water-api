// 导入ET
const ET = require('./ET');

const woAddError = new ET('20001', '添加工单失败');
const woChangeError = new ET('20002', '修改工单失败');
const woGetError = new ET('20003', '获取工单详情失败');
const woGetPersonError = new ET('20004', '获取个人工单列表失败');
const woNotExistError = new ET('20005', '工单不存在'); 


const woDBError = new ET('70001','数据库获取失败');

//导出上面的错误对象
module.exports = {
    woAddError,
    woDBError,
    woChangeError,
    woGetError,
    woGetPersonError,
    woNotExistError ,

};
