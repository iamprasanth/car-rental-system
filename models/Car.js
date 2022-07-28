const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const CarSchema = new mongoose.Schema({
    licenseNumber: {
        type: String,
        required: true,
        default: "M1H 000",
        max: 50,
    },
    make: {
        type: String,
        required: true,
        max: 50,
    },
    model: {
        type: String,
        required: true,
        max: 50,
    },
    description: {
        type: String,
        required: true,
        default: "This is a car",
        max: 500,
    },
    passengerCount: {
        type: Number,
        default: 4
    },
    image: {
        type: String,
        default: "car.png",
        required: true,
    },
    perDayFare: {
        type: SchemaTypes.Double,
        required: true,
        default: 100.90
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Car", CarSchema);