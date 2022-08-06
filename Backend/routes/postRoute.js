const router = require('express').Router()
const PostController = require('../controllers/PostController')

// Get All Posts
router.get('/allposts', PostController.getAllPosts);

// Retrieve specific post from database
router.get('/:id', PostController.getPost);

// Add new post
router.post('/newpost', PostController.addNewPost);

// Update post
router.put('/updatepost/:id', PostController.updatePost)

// Delete post
router.delete('/deletepost/:id', PostController.deletePost);

module.exports = router;