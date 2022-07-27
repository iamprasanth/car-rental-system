const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/users');

usersRouter.route('/:id')
    // Get a user's details
    .get(userController.get)
    // Update a user's details
    .put(userController.update)
    // Delete a user
    .delete(userController.delete);

// Make a user follow another user
usersRouter.route('/:id/follow').put(userController.follow)


// Get user details on search
usersRouter.route('/autocomplete').post(userController.getUsersForAutocomplete)



module.exports = usersRouter