const router = require('express').Router()
const authController = require('../controllers/authcontroller');
const UserController = require('../controllers/UsersController.js');

// login user
router.post('/login', authController.login);

// token verification
//router.get('/veriftoken', authController.verifyToken);

module.exports = router;
