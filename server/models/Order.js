const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    totalFare: {
        type: SchemaTypes.Double,
        required: true,
    },
    stripeCheckoutId: {
        type: String
    },
    stripeCustomerId: {
        type: String
    },
    isPaymentComplete: {
        type: Boolean,
        required: true,
        default: 0
    },
    isReturned: {
        type: Boolean,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);