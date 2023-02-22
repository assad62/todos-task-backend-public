const constants = require("../constants/constants");
const authService = require("../service/authService");

module.exports.signup = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const resp = await authService.signup(req.body);
    response.status = 200;
    response.message = "Signup";
    response.body = resp;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.login = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const resp = await authService.login(req.body);
    response.status = 200;
    response.message = "Login User";
    response.body = resp;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.resetPassword = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const resp = await authService.resetPassword(req.body);
    response.status = 200;
    response.message = "Reset Password";
    response.body = resp;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.forgotPassword = async (req, res) => {
 
  let response = { ...constants.defaultServerResponse };
  
  try {
    const resp = await authService.forgotPassword(req.body);
    response.status = 200;
    response.message = "Forgot Password";
    response.body = resp;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deleteUser = async (req, res) =>{
  let response = { ...constants.defaultServerResponse };

  try {
    const resp = await authService.deleteUser(req.headers['authorization'])
    response.status = 204;
    response.message = "Delete User";
    response.body = resp;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);

}