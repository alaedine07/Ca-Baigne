const router = require('express').Router()
const UserController = require('../controllers/UsersController')

// Test User routes
router.get('/testuserroutes', UserController.TestUserRoutes);



module.exports = router;