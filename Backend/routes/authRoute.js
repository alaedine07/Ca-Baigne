const router = require('express').Router()
const authController = require('../controllers/authcontroller');


// login user
router.post('/login', authController.login);


module.exports = router;
