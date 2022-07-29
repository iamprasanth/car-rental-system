const express = require('express');
const chatbotRouter = express.Router();
const chatbotController = require('../controllers/chatbot');

// Register a new user
chatbotRouter.route('/start-date').get(chatbotController.getServiceStartDate)

chatbotRouter.route('/end-date').get(chatbotController.getServiceEndDate)

chatbotRouter.route('/total-fare').get(chatbotController.getTotalFare)

chatbotRouter.route('/car-details').get(chatbotController.getCarDetails)


module.exports = chatbotRouter
