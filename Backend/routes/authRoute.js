const router = require('express').Router()
const authController = require('../controllers/authcontroller');

// login user
router.post('/login', authController.login);

// token verification
router.get('/veriftoken', authController.verifyToken);

module.exports = router;