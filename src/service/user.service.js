const User = require('../model/user.model');

class userService {
    async dologin(user_id) {

        // console.log(User);
        const res = await User.findOne({
            attributes:['password'],
            where:{id:user_id}
        })
        return res.password
    }
}

module.exports = new userService();