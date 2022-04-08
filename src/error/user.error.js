// 导入ET
const ET = require('./ET');

//最好提前对code进行明确的分类，这样到errorhandle的文件中进行更明确的条件判断区分

const userFormateError = new ET('10001', '用户输入手机号或密码为空');
const userNotExit = new ET('10002', '此手机号的用户不存在');
const userLoginError = new ET('10003','用户登陆失败(可能性比较多)');
const userInvalidPwd = new ET('10004','用户的手机号和密码不匹配');
const userChangePWDError = new ET('10005','用户密码更改失败');
const userChangeMessageError = new ET('10006','用户信息更改失败');
const userGetMessageError = new ET('10007','用户信息获取失败');
const userTypeError = new ET('10008','用户类型错误');

const authInvalidToken = new ET('10100','无效token');
const authOverdueToken = new ET('10101','过期token');

const userDBError = new ET('70001','数据库获取失败');

module.exports = {
    userFormateError,
    userNotExit,
    userLoginError,
    userInvalidPwd,
    userDBError,
    authInvalidToken,
    authOverdueToken,
    userChangePWDError,
    userChangeMessageError,
    userGetMessageError,
}
