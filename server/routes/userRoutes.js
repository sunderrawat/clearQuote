const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

//create user route end points
router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);

module.exports = router;