const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const tokenValidation = require('../middleware/tokenValidation')

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/reset_password", tokenValidation.validateToken,authController.resetPassword);
router.post("/forgot_password", authController.forgotPassword);
router.delete("/delete",tokenValidation.validateToken, authController.deleteUser)

module.exports = router;
