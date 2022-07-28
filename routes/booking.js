const express = require('express');
const bookingRouter = express.Router();
const bookingController = require('../controllers/booking');

// Get list car available for given date
bookingRouter.route('/cars').post(bookingController.getAvailableCars)

bookingRouter.route('/checkout').post(bookingController.checkout)



module.exports = bookingRouter
