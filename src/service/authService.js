const User = require("../models/userModel");
const randomPassword = require(".././utils/randomPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const utills = require('../utils/utils')

module.exports.signup = async ({ name, email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error();
    }

    if (6 <= password.length && password.length <= 8) {
      password = await bcrypt.hash(password, 12);
      const newUser = new User({ name, email, password });
      let result = await newUser.save();
      return result;
    }
    throw new Error("password must be between 6 and 8 characters");
  } catch (error) {
    console.log("Something went wrong: Service: signup", error);
    throw new Error(error);
  }
};

module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("invalid password");
      //throw new Error(constants.userMessage.INVALID_PASSWORD);
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "1d" }
    );
    return {
      name: user.name,
      token,
    };
  } catch (error) {
    console.log("Something went wrong: Service: login", error);
    throw new Error(error);
  }
};

module.exports.resetPassword = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }
    let newPassword = await bcrypt.hash(password, 12);

    let res = await User.findOneAndUpdate(
      { _id: user._id },
      {
        password: newPassword,
      }
    );

    return res;
  } catch (error) {
    console.log("Something went wrong: Service: reset pw", error);
    throw new Error(error);
  }
};

module.exports.forgotPassword = async ({ email }) => {
  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }

    let newPassword = randomPassword.getRandomPassword();
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        type: process.env.AUTH_TYPE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        clientId: process.env.EMAIL_CLIENT_ID,
         clientSecret: process.env.EMAIL_CLIENT_SECRET,
         refreshToken: process.env.EMAIL_REFRESH_TOKEN
      },
    });

    var mailOptions = {
      from:process.env.EMAIL_USER,
      to: email,
      subject: "New Password",
      text: `Hi ${user.name}, your new password is ${newPassword}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let newPasswordToStore = await bcrypt.hash(newPassword, 12);

    let res = await User.findOneAndUpdate(
      { _id: user._id },
      {
        password: newPasswordToStore,
      }
    );

    return {
       message: "Success! The new password has been sent to your registered email"
    };
  } catch (error) {
    console.log("Something went wrong: Service: reset pw", error);
    throw new Error(error);
  }
};

module.exports.deleteUser = async(authToken) =>{

    try{
      const userId = utills.getUserId(authToken)
      await User.deleteOne( { _id: userId })

      return {
        message: "User sucessfully deleted"
      }
    }
    catch(error){
      throw new Error(error);
    }
   
}