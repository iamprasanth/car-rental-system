const Car = require('../models/Car');
const Order = require('../models/Order');
const responseController = require('./response');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid").v4;

// Get list car available for given date
exports.getAvailableCars = async (req, res) => {
    try {
        let currentDate = new Date();
        let currentHour = new Date().getHours();
        let fromDate = req.body.from_date.split('-');
        let fromDateForComparing = new Date(fromDate[0], fromDate[1] - 1, fromDate[2]);
        fromDate = new Date(fromDate[0], fromDate[1] - 1, fromDate[2]).setHours(0, 0, 0, 0);

        let toDate = req.body.to_date.split('-');
        let toDateForComparing = new Date(toDate[0], toDate[1] - 1, toDate[2], -4, 0, 0);
        toDate = new Date(toDate[0], toDate[1] - 1, toDate[2]).setHours(0, 0, 0, 0);

        let numberOfDays = Math.ceil((toDate - fromDate) / (1000 * 3600 * 24)) + 1;

        // Validations
        validationErrors = {}
        if ((fromDate == currentDate) && currentHour >= 18) {
            validationErrors['from_date'] = 'Service from date cannot be chosen same day if time is past 6 pm'
        }
        if (fromDate < currentDate) {
            validationErrors['from_date'] = 'Service from date cannot be a past date'
        }
        if (fromDate > toDate) {
            validationErrors['to_date'] = 'Select a valid date'
        }
        // Return error response if validationErrors
        if (JSON.stringify(validationErrors) !== '{}') {
            return responseController.errorResponse(res, 200, validationErrors);
        }
        var cars = {};
        if (req.body.passenger_count == '') {
            cars = await Car.find({});
        } else {
            var passengerCount = parseInt(req.body.passenger_count, 10)
            cars = await Car.find({ "passengerCount": { $gte: passengerCount } });
        }
        var orderType1 = orderType2 = orderType3 = [];
        var availableCars = []
        for (let i = 0; i < cars.length; i++) {
            let car = cars[i];
            orderType1 = await Order.find({
                "carId": car._id,
                "fromDate": { $gte: toDateForComparing },
                "toDate": { $lte: toDateForComparing }
            });
            orderType2 = await Order.find({
                "carId": car._id,
                "fromDate": { $lte: fromDateForComparing },
                "fromDate": { $gte: toDateForComparing },
            });
            orderType3 = await Order.find({
                "carId": car._id,
                "fromDate": { $gte: fromDateForComparing },
                "toDate": { $lte: toDateForComparing },
            });
            if (
                JSON.stringify(orderType1) === '[]' &&
                JSON.stringify(orderType2) === '[]' &&
                JSON.stringify(orderType3) === '[]'
            ) {
                availableCars.push(car);
            }
        }
        let bookingSettings = {
            from_date: req.body.from_date,
            to_date: req.body.to_date,
            passenger_count: req.body.passenger_count,
            number_of_days: numberOfDays
        }

        return responseController.succesResponse(res, { cars: availableCars, settings: bookingSettings });
    } catch (err) {
        responseController.errorResponse(res, 500, err.message);
    }
};

// Handle Strip checkout
exports.checkout = async (req, res) => {
    try {
        const { product, token } = req.body;
        const stripeCustomer = await stripe.customers.create({
            source: 'tok_mastercard',
            email: token.email,
        });

        // Perform checkout
        const idempotencyKey = uuid();
        const charge = await stripe.charges.create(
            {
                amount: product.totalFare * 100,
                currency: "CAD",
                customer: stripeCustomer.id,
                receipt_email: token.email,
                description: `New booking`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip,
                    },
                },
            },
            {
                idempotencyKey,
            }
        )
        console.log(charge)
        // Get new order number and store details to Order table
        const orderNumber = await generateOrderNumber()
        const newOrder = new Order({
            orderNumber: orderNumber,
            customerId: product.customerId,
            carId: product.carId,
            fromDate: product.fromDate,
            toDate: product.toDate,
            totalDays: product.totalDays,
            totalFare: product.totalFare,
            stripeCustomerId: stripeCustomer.id,
            stripeCheckoutId: charge.id
        });
        const order = await newOrder.save();

        return responseController.succesResponse(res, orderNumber);
    } catch (error) {
        console.error(error);
        responseController.errorResponse(res, 500, "Payment error");
    }
}

// Function returns a new order ID
generateOrderNumber = async () => {
    const latestOrder = await Order.findOne({}).sort([['createdAt', -1]]);
    if (latestOrder) {
        // Orders already exist
        const latestOrderNumber = latestOrder.orderNumber
        const splitOrderNumber = latestOrderNumber.split("CRS");
        const orderNumberDigits = parseInt(splitOrderNumber[1]);
        var newOrderNumber = (orderNumberDigits + 1) + "";
        while (newOrderNumber.length < 5) newOrderNumber = "0" + newOrderNumber;

        return "CRS" + newOrderNumber;
    }

    // Return order for first order ID
    return "CRS00001";
}
