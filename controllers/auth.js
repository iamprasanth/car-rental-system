const User = require('../models/User');
const responseController = require('./response');

// Register a new user
exports.register = async (req, res) => {
    try {
        const newUser = new User({
            fullname: req.body.fullname,
            phone: req.body.phone,
            firebaseUserId: req.body.firebaseUserId,
            email: req.body.email,
        });
        const user = await newUser.save();
        return responseController.succesResponse(res, user);
    } catch (err) {
        responseController.errorResponse(res, 500, err.message);
    }
};

// Get user details by mapping firebaseUserId
exports.login = async (req, res) => {
    console.log(req.body.firebaseUserId)
    try {
        const user = await User.findOne({ firebaseUserId: req.body.firebaseUserId });
        if (user) {
            return responseController.succesResponse(res, user);
        }

        return responseController.errorResponse(res, 401, 'unauthorized');
    } catch (err) {
        return responseController.errorResponse(res, 500, err.message);
    }
};
