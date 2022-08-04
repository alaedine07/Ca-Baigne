const router = require('express').Router()
const PostController = require('../controllers/PostController')

// Get all posts
router.get('/testpostsroutes', PostController.TestPostsRoutes);

module.exports = router;