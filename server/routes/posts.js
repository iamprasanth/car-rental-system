const express = require('express');
const postsRouter = express.Router();
const postsController = require('../controllers/posts');

postsRouter.route('/')
    // Create a new post
    .post(postsController.create)
    // Update a post
    .put(postsController.update)
    // Delete a post
    .delete(postsController.delete);

// Delete a comment under a post
postsRouter.route('/comment-delete').delete(postsController.deleteComment)

// Get a post
postsRouter.route('/:postId').get(postsController.getOnePost)

// Get all post of a user
postsRouter.route('/user/:username').get(postsController.getAllUserPost)

// Like / DisLike a post
postsRouter.route('/like/:postId/').post(postsController.like);

// create a new comment under a post
postsRouter.route('/:postId/comment/').post(postsController.createComment);

// get post for user's time line
postsRouter.route('/timeline/:userId/').get(postsController.getTimeLine);

module.exports = postsRouter
