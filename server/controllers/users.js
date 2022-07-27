const User = require('../models/User');
const responseController = require('./response');
const bcrypt = require('bcrypt');

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


// Get a user's details
exports.getUsersForAutocomplete = async (req, res) => {
    try {

        const userRegex = new RegExp(req.body.keyword, 'i')
        var user = await User.find(
            {
                _id: { $nin: [req.body.userId] }
            },
            'username fullname'
        ).or(
            [
                { username: userRegex },
                { fullname: userRegex },
            ]
        )
        if (user) {
            return responseController.succesResponse(res, user);
        }

        responseController.errorResponse(res, 404, 'user not found');
    } catch (err) {
        responseController.errorResponse(res, 500, err);
    }
};

// Update a user
exports.update = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            var update = { password: hashedPassword };
        } else {
            var update = req.body;
        }
        const userUpdate = await User.findOneAndUpdate(
            { id: req.params.id },
            update,
            { new: true }
        );
        if (userUpdate) {
            return responseController.succesResponse(res, userUpdate);
        }
        responseController.errorResponse(res, 404, 'user not found');
    } catch (err) {
        responseController.errorResponse(res, 500, err);
    }
};

// Delete a user
exports.delete = async (req, res) => {
    try {
        const userDeleted = await User.findByIdAndRemove(req.params.dishId);
        if (userDeleted) {
            return responseController.succesResponse(res, "deleted");
        }

        responseController.errorResponse(res, 404, 'user not found');
    } catch (err) {
        responseController.errorResponse(res, 500, err);
    }
};

// Follow a user
exports.follow = async (req, res) => {
    try {
        const receivingUser = await User.findById(req.body.receiving_user);
        if (!receivingUser.followers.includes(req.body.requesting_user)) {
            const followersUpdate = await User.findByIdAndUpdate(
                req.body.receiving_user,
                { $addToSet: { followers: req.body.requesting_user } },
                { new: true }
            ).populate('followers');
            const followingsUpdate = await User.findByIdAndUpdate(
                req.body.requesting_user,
                { $addToSet: { followings: req.body.receiving_user } },
                { new: true }
            );

            return responseController.succesResponse(res, {
                requestingUser: followingsUpdate,
                receivingUser: followersUpdate
            });
        } else {
            const removeFollower = await User.findByIdAndUpdate(
                req.body.receiving_user,
                { $pull: { followers: req.body.requesting_user } },
                { new: true }
            ).populate('followers');
            const removeFollowing = await User.findByIdAndUpdate(
                req.body.requesting_user,
                { $pull: { followings: req.body.receiving_user } },
                { new: true }
            );

            return responseController.succesResponse(res, {
                requestingUser: removeFollowing,
                receivingUser: removeFollower
            });
        }
    } catch (err) {
        responseController.errorResponse(res, 500, err);
    }
};

// UnFollow a user
exports.unfollow = async (req, res) => {
    try {
        const receivingUser = await User.findById(req.body.receiving_user);
        if (receivingUser.followers.includes(req.body.requesting_user)) {
            const removeFollower = await User.findByIdAndUpdate(
                req.body.receiving_user,
                { $pull: { followers: req.body.requesting_user } }
            );
            const removeFollowing = await User.findByIdAndUpdate(
                req.body.requesting_user,
                { $pull: { followings: req.body.receiving_user } }
            );
            return responseController.succesResponse(res, "Unfollow success");
        } else {
            responseController.errorResponse(res, 403, "Not following");
        }
    } catch (err) {
        responseController.errorResponse(res, 500, err);
    }
};

