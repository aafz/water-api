const { DataTypes } = require('sequelize');

const seq = require('../db/seq');
// const User = require('./user.model');
// const Site = require('./site.model')
const Device = require('./device.model')

const Alarm = seq.define('Alarm', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER(100),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '报警信息id'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '报警信息名称'
    },
    message: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ' ',
        comment: '报警信息内容'
    },
    level: {
        type: DataTypes.ENUM('特别严重', '严重', '一般', ''),
        allowNull: false,
        defaultValue: '',
        comment: '报警等级'
    },
    noticetime: {
        type: DataTypes.DATE(6),
        allowNull: true,
        comment: '报警信息通知发送时间'
    },
    smstime: {
        type: DataTypes.DATE(6),
        allowNull: true,
        comment: '报警信息短信发送时间'
    },
    smssent: {
        type: DataTypes.ENUM(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: '报警短信已经发送否'
    },
    //外键部分
    devid: {
        type: DataTypes.INTEGER(20),
        references: {
            model: Device,
            key: id,
        }
    },
}, {
    tableName: 'alarms',
    timestamps: true,    //启用时间戳 来取代开始时间和更新时间
    createdAt: 'time',
    updatedAt: false  //这个不确定要不要
}
);

//User.sync() //- 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// User.sync({ alter: true }) //- 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// WO.sync({ force: true });
console.log("Alarm模型表刚刚(重新)创建！");

module.exports = Alarm;


// // `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

