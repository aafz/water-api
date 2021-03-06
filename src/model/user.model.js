const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const User = seq.define('User', {
    // 在这里定义模型属性
    tel: {
        type: DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
        unique: true,//唯一约束
        validate:{
            isNumeric: true,          // 只允许数字
            notNull: true,            // 不允许为空
            len: [13,13],              // 仅允许长度在2到10之间的值
        },//验证器
        comment: '用户手机号代替id'
    },
    name:{
        type:DataTypes.STRING(20),
        allowNull: false,
        comment:'用户名'
    },
    sex:{
        type:DataTypes.ENUM('男','女'),
        allowNull: false,
        comment:'性别'
    },
    wx:{
        type:DataTypes.STRING(20),
        allowNull: false,
        comment:'微信号'
    },
    type:{
        type:DataTypes.ENUM('超级管理员','管理员','巡检人员','工单派发人员','测试人员','公司用户'),
        allowNull: false,
        comment:'人员类型'
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '密码'
    }
}, {
    tableName: 'users',
    timestamps: false
  }
);

// User.sync({ force: true });
// console.log("用户模型表刚刚(重新)创建！");

//User.sync() //- 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// User.sync({ alter: true }) //- 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

module.exports = User;


// // `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

