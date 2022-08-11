const Order = require('../models/Order');
const responseController = require('./response');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get orders
exports.getOrdersList = async (req, res) => {
    const orders = await Order.find({}).sort([['createdAt', -1]]).populate('carId').populate('customerId');
    // const customerId = "cus_M8ViBydAt8FZqp";
    // const charge = await stripe.charges.create(
    //     {
    //         amount: 300,
    //         currency: "CAD",
    //         customer: customerId,
    //         description: `New booking`,
    //     })

    return res.status(200).json(orders);
}

// Mark an order as complete
exports.markAsReturned = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.body._id,
            req.body,
            { new: true }
        );

        return responseController.succesResponse(res, order);
    } catch (err) {
        responseController.errorResponse(res, 500, err.message);
    }
}
