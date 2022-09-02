const router = require('express').Router()
const PostController = require('../controllers/PostController');
const UserController = require('../controllers/UsersController');

// Get All Posts
router.get('/allposts', PostController.getAllPosts);

// Retrieve specific post from database
router.get('/:id', PostController.getPost);

// Add new post
router.post('/newpost', UserController.verifyToken, PostController.addNewPost);

// Update post
router.put('/updatepost/:id', UserController.verifyToken, PostController.updatePost)

// Delete post
router.delete('/deletepost/:id', UserController.verifyToken, PostController.deletePost);

module.exports = router;
