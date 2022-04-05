
//导入device.model
const Device = require('../model/device.model');

class DeviceService {

    //获取设备列表
    async getDeviceList(site_id){
        const res = await Device.findAll({
            attributes: ['id', 'name','type'],
            where: { siteid: site_id }
        });
        return res
    }

    //获取单个设备详情(根据id)
    async getDevDetailbyID(dev_id){
        let res ;
        // try {
            res = await Device.findOne({
                attributes: ['id', 'name', 'type','subtype'],
                where: { id: dev_id }
            });
        // } catch (error) {
        //     console.error(error);
        // }
        
        return res
    }

}

module.exports = new DeviceService();