const Order = require('../models/Order');

// Get service start date
exports.getServiceStartDate = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id.toUpperCase() });
    if (order) {
        return res.status(200).json({ response: formatDate(order.fromDate) });
    }

    return res.status(200).json({ response: "Invalid Order ID" });
}

// Get service end date
exports.getServiceEndDate = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id.toUpperCase() });
    if (order) {
        return res.status(200).json({ response: formatDate(order.toDate) });
    }

    return res.status(200).json({ response: "Invalid Order ID" });
}

// Get total fare
exports.getTotalFare = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id.toUpperCase() });
    if (order) {
        return res.status(200).json({ response: '$ ' + order.totalFare });
    }

    return res.status(200).json({ response: "Invalid Order ID" });
}

// Get car details
exports.getCarDetails = async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.query.id.toUpperCase() }).populate('carId');
    if (order) {
        return res.status(200).json({ response: order.carId.make + " " + order.carId.model });
    }

    return res.status(200).json({ response: "Invalid Order ID" });
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