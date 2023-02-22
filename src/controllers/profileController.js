const constants = require("../constants/constants");
const profileService = require('../service/profileService');


module.exports.getUserProfile = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const resp = await profileService.getUserProfile(req.headers['authorization'])
        response.status = 200
        response.message = "Get User Profile"
        response.body = resp
    }
    catch (error) {

        response.message = error.message

    }

    return res.status(response.status).send(response)
}