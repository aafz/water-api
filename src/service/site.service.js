//导入site.model
const Site = require('../model/site.model'); 

class SiteService {
    //实现site的查改

    //获取站点列表
    async getSiteList(){
        const res = await Site.findAll({
            attributes: ['id', 'name', 'status','address','type','updatetime'],
        });
        return res
    }

    //获取单个站点详情(根据id)
    async getSiteDetailbyID(site_id){
        const res = await Site.findOne({
            attributes: ['id', 'name', 'status','address','type','updatetime'],
            where: { id: site_id }
        });
        return res
    }

    //修改站点状态
    async updateSiteStatus(site_id,site_status){

        const res = await Site.update({
            status: site_status,
        }, {
            where: { id: site_id }
        });

        //都存在时区问题

        // const res = await Site.findOne({
        //     attributes: ['id', 'name', 'status','address','type','updatetime'],
        //     where: { id: site_id }
        // });
        // console.log(res);
        // res.status  = site_status;
        // res.updatetime = new Date();
        // console.log(new Date());
        // res.save();

        // console.log(res);
        return res
    }
}

module.exports = new SiteService();