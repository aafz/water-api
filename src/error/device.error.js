// 导入ET
const ET = require('./ET');

const deviceGetListError = new ET('40001','获取站点设备列表失败');
const deviceGetDetailError = new ET('40002','获取站点设备详情失败');


// 导出以上的error
module.exports = {
    deviceGetListError, 
    deviceGetDetailError,
    
};