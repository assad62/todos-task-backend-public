const utills = require('../utils/utils')
const User = require("../models/userModel");

module.exports.getUserProfile = async(authToken) =>{
    const userId = utills.getUserId(authToken)
    const user = await User.findOne({ _id:userId });
    if (!user) {
      throw new Error();
    }
    return {
        "name":user.name,
        "email":user.email
    }
}