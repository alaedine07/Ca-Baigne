const router = require('express').Router()
const authController = require('../controllers/authcontroller');


// login user
router.post('/login', authController.login);

// register via facebook
router.post('/facebookregistration', authController.facebookRegistration);

// login via facebook
router.post('/facebooklogin', authController.facebookLogin)



module.exports = router;
