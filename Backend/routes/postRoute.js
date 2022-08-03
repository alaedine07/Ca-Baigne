const router = require('express').Router()
const PostController = require('../controllers/PostController')

// api endpoints version 1
const API_URL = '/api/v1';

//Get all posts
router.get(API_URL + '/', PostController.Post);

module.exports = router;