const router = require('express').Router()
const UserController = require('../controllers/UsersController')

// api endpoints version 1
const API_URL = '/api/v1';

// Get all users
router.get(API_URL + '/', UserController.User);

module.exports = router;