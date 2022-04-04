const { DataTypes } = require('sequelize');

const seq = require('../db/seq');
// const User = require('./user.model');

const Site = seq.define('Site', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,//唯一约束
        // validate:{
        //     isNumeric: true,          // 只允许数字
        //     notNull: true,            // 不允许为空
        //     len: [13,13],              // 仅允许长度在2到10之间的值
        // },//验证器
        comment: '站点id'
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: '站点名称'
    },
    status: {
        type: DataTypes.ENUM('已启用', '未启用'),
        allowNull: false,
        defaultValue: '未启用',
        comment: '站点状态'
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '站点地址'
    },
    type: {
        type: DataTypes.ENUM('一体化泵站', '污水处理站点'),
        comment: '站点类型'
    },
    message: {
        type: DataTypes.DATE(6),
        allowNull: false,
        comment: '站点上一次修改状态时间'
    }
}, {
    tableName: 'sites',
    timestamps: false
}
);

// Site.sync() //- 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// Site.sync({ alter: true }) //- 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// Site.sync({ force: true });
// console.log("site模型表刚刚(重新)创建！");

module.exports = Site;


// // `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

