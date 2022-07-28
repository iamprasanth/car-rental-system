const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth');

// Register a new user
authRouter.route('/register').post(authController.register)
// Login a user
authRouter.route('/login').post(authController.login)

module.exports = authRouter
