const Order = require('../models/Order');

// Get service start date
exports.getServiceStartDate = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id });

    return res.status(200).json(formatDate(order.fromDate));
}

// Get service end date
exports.getServiceEndDate = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id });

    return res.status(200).json(formatDate(order.toDate));
}

// Get total fare
exports.getTotalFare = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id });

    return res.status(200).json('$ ' + order.totalFare);
}

// Get car details
exports.getCarDetails = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id }).populate('carId');

    return res.status(200).json(order.carId.make + " " + order.carId.model);
}

function formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date(date);
    const currentMonth = monthNames[date.getMonth()];
    const currentDate = date.getDate();

    return `${currentMonth} ${currentDate}, ${date.getFullYear()}`;
}