const router = require('express').Router()
const PostController = require('../controllers/PostController')

// Get all posts
router.get('/testpostsroutes', PostController.TestPostsRoutes);

// Add new beach
router.post('/newpost', PostController.AddNewPost);

// Delete Beach
router.delete('/deletepost', PostController.DeletePost);

module.exports = router;