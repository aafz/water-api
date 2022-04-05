const Inspection = require('../model/inspection.model');

const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

class InsService {
    //实现巡检的改查

    //获取个人巡检列表
    async getInsList(tel){
        // console.log(tel);
        //根据persons中含有tel来选择
        //使用模糊查询
        let res;

        try {
            res = await Inspection.findAll({
                //列表不需要那么多字段
                // attributes: ['id', 'name', 'level', 'status', 'starttime', 'updatetime', 'message', 'description','submitter_tel','maintainer_tel','dispatcher_tel'],
                attributes: ['id', 'name', 'status','persons'],
                where: { persons: { [Op.like]: '%' + tel + '%' } },
            });
        } catch (error) {
            console.error(error);
        }

        return res
    }

    //获取巡检详情
    async getInsDetail(ins_id){
        const res = await Inspection.findOne({
            attributes: ['id', 'name', 'model', 'status','persons','persontype','description','timemodel','cyclictime','siteid','starttime','updatetime'],
            where: { id: ins_id }
        });
        return res
    }

    //修改巡检提交处理完成后的信息
    //参数：提交者tel，巡检id，处理信息
    // async updateWO(wo_id,mes,wo_status,main_tel){
    //     const res = await WO.update({
    //         status: wo_status,
    //         message: mes,
    //     }, {
    //         where: { id: wo_id }
    //     });
    //     // res.save();
    //     //save 不用写
    //     return res
        
    // }

}

module.exports = new InsService();