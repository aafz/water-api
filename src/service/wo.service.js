const WO = require('../model/wo.model');
//数据库查询部分
//SQL语句转化部分

class WOService {
    //实现工单的增改查

    //增加工单  //到时候直接传进来一个对象算了
    async addWO(WOobject){
        const wo = await WO.create(WOobject);
        //create  =build + save
        return wo;
    }

    //获取个人工单列表
    async getWOListByTel(tel){
        // console.log(tel);
        const res = await WO.findAll({
            //列表不需要那么多字段
            // attributes: ['id', 'name', 'level', 'status', 'starttime', 'updatetime', 'message', 'description','submitter_tel','maintainer_tel','dispatcher_tel'],
            attributes: ['id', 'name', 'level', 'status', 'starttime', 'updatetime'],
            where: { maintainer_tel: tel }
        });
        return res
    }

    //获取工单详情
    async getWODetail(wo_id){
        const res = await WO.findOne({
            attributes: ['id', 'name', 'level', 'status', 'starttime', 'updatetime', 'message', 'description','submitter_tel','maintainer_tel','dispatcher_tel'],
            where: { id: wo_id }
        });
        return res
    }

    //修改工单提交处理完成后的信息
    //参数：提交者tel，工单id，处理信息
    async updateWO(wo_id,mes,wo_status,main_tel){
        const res = await WO.update({
            status: wo_status,
            message: mes,
        }, {
            where: { id: wo_id }
        });
        // res.save();
        //save 不用写
        return res
        
    }

}

module.exports = new WOService();