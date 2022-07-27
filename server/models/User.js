const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    firebaseUserId: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);