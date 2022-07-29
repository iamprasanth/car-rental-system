const User = require('../models/User');
const responseController = require('./response');

// Get a user's details
exports.get = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (user) {
            return responseController.succesResponse(res, user);
        }

        responseController.errorResponse(res, 404, 'user not found');
    } catch (err) {
        responseController.errorResponse(res, 500, err);
    }
};
