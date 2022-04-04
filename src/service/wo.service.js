const WO = require('../model/wo.model');
//数据库查询部分
//SQL语句转化部分

class WOService {
    //实现工单的增改查

    //增加工单  //到时候直接传进来一个对象算了
    async addWO(WOobject){
        const wo = await WO.create(WOobject);
        // const wo = await WO.create({
        //     id: 0,
        //     name: 'test',
        //     level: '不急',
        //     status: '未派发',
        //     description: 'test11111111111111111111',
        //     site_id: 1234578,
        //     submitter_tel:tel
        // });

        //create  =build + save
        return wo;
    }

    //获取个人工单列表
    async getWOListByTel(tel){
        const res = await WO.findAll({
            //列表不需要那么多字段
            // attributes: ['id', 'name', 'level', 'status', 'starttime', 'endtime', 'message', 'description','submitter_tel','maintainer_tel','dispatcher_tel'],
            attributes: ['id', 'name', 'level', 'status', 'starttime', 'endtime'],
            where: { maintainer_tel: tel }
        });
        return res
    }

    //获取工单详情
    async getWODetail(wo_id){
        const res = await WO.findOne({
            attributes: ['id', 'name', 'level', 'status', 'starttime', 'endtime', 'message', 'description','submitter_tel','maintainer_tel','dispatcher_tel'],
            where: { id: wo_id }
        });
        return res
    }

    //修改工单提交处理完成后的信息
    //参数：提交者tel，工单id，处理信息
    async updateWO(wo_id,sub_tel,mes){
        const res = await WO.update({
            status: '已处理',
            submitter_tel: sub_tel,
            message: mes,
        }, {
            where: { id: wo_id }
        });
        res.save();
        return res
    }

}

module.exports = new WOService();