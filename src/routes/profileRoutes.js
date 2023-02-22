const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')
const tokenValidation = require('../middleware/tokenValidation')


//get current user profile
router.get('/', tokenValidation.validateToken, profileController.getUserProfile)




module.exports = router;