const User = require('../model/user.model');
//数据库查询部分
//SQL语句转化部分

class userService {
    
    //获取个人信息 (包括密码)
    async getUserInfo(user_tel) {
        const res = await User.findOne({
            attributes: ['tel', 'name', 'sex', 'wx', 'type', 'password'],
            where: { tel: user_tel }
        });
        // console.log('user.service');
        // console.log(res);
        return res
    };

    //获取个人用户类型
    async getUserType(user_tel){
        const res = await User.findOne({
            attributes: ['type'],
            where: { tel: user_tel }
        });
        return res.type
    }


    //将修改信息和修改密码合并
    //以下有两个方案：

    //方案一    传参将要修改的参数组成对象进行传参
    async changebytel(user_tel, updateObj) {

        console.log(updateObj);
        const res = await User.update(updateObj, {
            where: {
                tel: user_tel
            }
        });
        return res
    }

    // 方案二   传参分开传，按顺序传，在改前查询数据对未传参的参数用原有数据填充
    async changeALLbytel(user_tel, user_PWD, user_name, user_sex, user_wx, user_type) {

        const olduser = await User.findOne({
            attributes: ['tel', 'name', 'sex', 'wx', 'type', 'password'],
            where: { tel: user_tel }
        });
        // 获取原来的个人信息
        // 为空的参数就遵循原值
        user_PWD = user_PWD || olduser.password;
        user_name = user_name || olduser.name;
        user_sex = user_sex || olduser.sex;
        user_wx = user_wx || olduser.wx;
        user_type = user_type || olduser.type;

        // 有哪个参数就填装哪个参数进去
        // console.log(user_tel, user_PWD, user_name, user_sex, user_wx, user_type);
        const res = await User.update({
            password: user_PWD,
            name: user_name,
            sex: user_sex,
            wx: user_wx,
            type: user_type,
        }, {
            where: {
                tel: user_tel
            }
        })

    }

}

module.exports = new userService();