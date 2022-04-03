const { DataTypes } = require('sequelize');

const seq = require('../db/seq');
const Site = require('./site.model');

const Device = seq.define('Device', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,//唯一约束
        comment: '设备id'
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: '设备名称'
    },
    // status: {
    //     type: DataTypes.ENUM('已启用', '未启用'),
    //     allowNull: false,
    //     defaultValue: '未启用',
    //     comment: '设备状态'
    // },
    fatory: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '设备产家'
    },
    model: {
        type: DataTypes.STRING(20),
        comment: '设备型号'
    },
    // message: {
    //     type: DataTypes.DATE(6),
    //     allowNull: false,
    //     comment: '设备上一次修改状态时间'
    // },
    type: {
        type: DataTypes.ENUM('电机设备', '电磁阀设备', '传感器'),
        allowNull: false,
        comment: '设备类型'
    },
    subtype: {
        // type: DataTypes.ENUM('污泥泵', '风机', '调节提升泵', '', '', '', ''),  //类型太多了，还是用char
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '子设备类型'
    },
    siteid: {
        type: DataTypes.INTEGER(20),
        references: {
            model: Site,
            key: id,
        }
    }
}, {
    tableName: 'devices',
    timestamps: false
}
);

//User.sync() //- 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// User.sync({ alter: true }) //- 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// WO.sync({ force: true });
console.log("device模型表刚刚(重新)创建！");

module.exports = Device;


// // `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

