// 导入ET
const ET = require('./ET');

const siteNotExist = new ET('30001', '站点不存在');
//站点状态修改失败
const siteChangeStatusError = new ET('30002', '站点状态修改失败');
//获取站点列表失败
const siteGetListError = new ET('30003', '获取站点列表失败');
//获取单个站点详情失败
const siteGetDetailError = new ET('30004', '获取单个站点详情失败');

// const siteInvalidStatus = new ET('30002', '站点状态不合法');
// const siteInvalidType = new ET('30003', '站点类型不合法');

// 导出以上的error
module.exports = {
    siteNotExist,
    siteChangeStatusError,
    siteGetListError,
    siteGetDetailError,
};