const { DataTypes } = require('sequelize');

const seq = require('../db/seq');
const User = require('./user.model');
const Site = require('./site.model')

const Inspection = seq.define('Inspection', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '巡检id'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '巡检名称'
    },
    model: {
        type: DataTypes.ENUM('日常模式'),
        allowNull: false,
        comment: '巡检模式'
    },
    status: {
        type: DataTypes.ENUM('未巡检', '已巡检'),
        allowNull: false,
        defaultValue: '未巡检',
        comment: '巡检的状态'
    },
    // starttime: {
    //     type: DataTypes.DATE(6) ,
    //     allowNull: false,
    //     comment: '巡检创建时间'
    // },
    // endtime: {
    //     type:DataTypes.DATE(6) ,
    //     comment: '巡检修改时间'
    // },
    persontype: {
        type: DataTypes.ENUM('固定人员', '不固定人员'),
        allowNull: false,
        defaultValue: '固定人员',
        comment: '巡检人员类型'
    },
    persons: {
        // type: DataTypes.ARRAY(),//这个不知道能不能用
        type: DataTypes.STRING(300),   //数组类型就先这样存吧
        // allowNull: false,
        comment: '巡检人员列表'
    },
    description: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        comment: '巡检描述信息'
    },
    timemodel: {
        type: DataTypes.ENUM('周期性任务', '一次性任务'),
        allowNull: false,
        comment: '巡检时间类型'
    },
    cyclictime: {
        type: DataTypes.STRING(10),
        //到时候格式就按照 s min h d m y，需要自己写点处理函数
        allowNull: true,
        comment: '周期性巡检任务的循环时间'
    }
    ,
    //外键部分
    siteid: {
        type: DataTypes.INTEGER(20),
        references: {
            model: Site,
            key: id,
        }
    },
}, {
    tableName: 'inspections',
    timestamps: true,    //启用时间戳 来取代开始时间和更新时间
    createdAt: 'starttime',
    updatedAt: 'updatetime'
}
);

//User.sync() //- 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// User.sync({ alter: true }) //- 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// WO.sync({ force: true });
console.log("Inspection模型表刚刚(重新)创建！");

module.exports = Inspection;


// // `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

