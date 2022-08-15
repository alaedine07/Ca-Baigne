const router = require('express').Router()
const UserController = require('../controllers/UsersController')
const authController = require('../controllers/authcontroller');

// Get All Users
router.get('/allusers', UserController.getAllUsers);

// Retrieve specific user from database
router.get('/:id', authController.verifyToken, UserController.getUser);

// Add new user
router.post('/newuser', UserController.addNewUser);

// Update User
router.put('/updateuser/:id', authController.verifyToken, UserController.updateUser)

// Delete User
router.delete('/deleteuser/:id', authController.verifyToken, UserController.deleteUser);

module.exports = router;
