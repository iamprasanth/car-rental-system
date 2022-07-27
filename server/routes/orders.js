const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order');

// Get list car available for given date
orderRouter.route('/list').get(orderController.getOrdersList)

orderRouter.route('/mark-returned').post(orderController.markAsReturned)




module.exports = orderRouter
