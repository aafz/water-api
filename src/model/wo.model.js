const {
    DataTypes
} = require('sequelize');

const seq = require('../db/seq');
const User = require('./user.model');
const Site = require('./site.model');
const moment = require('moment');

const WO = seq.define('WO', {
    // 在这里定义模型属性
    id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '工单id'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '工单名称'
    },
    level: {
        type: DataTypes.ENUM('不急', '一般', '紧急', '特别紧急'),
        allowNull: false,
        comment: '故障等级'
    },
    status: {
        type: DataTypes.ENUM('未派发', '未处理', '已处理'),
        allowNull: false,
        defaultValue: '未派发',
        comment: '状态'
    },
    message: {
        type: DataTypes.STRING(100),
        // allowNull: false,
        comment: '提交信息'
    },
    description: {
        type: DataTypes.STRING(100),
        // allowNull: false,
        comment: '描述信息'
    },
    //外键部分
    //提交者
    submitter_tel: {
        type: DataTypes.STRING(15),
        references: {
            model: User,
            key: 'tel',
        },
        comment: '提交者'
    },
    //维护者
    maintainer_tel: {
        type: DataTypes.STRING(15),
        references: {
            model: User,
            key: 'tel',
        },
        comment: '维护者'
    },
    //派发者
    dispatcher_tel: {
        type: DataTypes.STRING(15),
        references: {
            model: User,
            key: 'tel',
        },
        comment: '派发者'
    },
    //站点id
    site_id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        references: {
            model: Site,
            key: 'id',
        }
    },
    //外键部分结束
}, {
    tableName: 'workorders',
    timestamps: true,
    //这个对于时区好像没有用
    //再想想
    //  {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW,
    //     get(){
    //         //moment() 使用的是本地时间
    //         let time = moment(this.getDataValue('timestamp'));
    //         console.log(time);
    //         time.add(8, 'hours');
    //         console.log(time);
    //         console.log(time.format('YYYY-MM-DD HH:mm:ss'));
    //         return moment(this.getDataValue('timestamp')).add(8,'h').format('YYYY-MM-DD HH:mm:ss');
    //     }
    //     //这个重复比较多，考虑把他导出去，或者使用Model继承的方式
    // },
    updatedAt: 'starttime',
    createdAt: 'updatetime',
});

// WO.sync() //- 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// WO.sync({ alter: true }) //- 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// WO.sync({ force: true });
// console.log("wo模型表刚刚(重新)创建！");

module.exports = WO;


// // `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true

// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.