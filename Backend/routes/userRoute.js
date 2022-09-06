const router = require('express').Router()
const UserController = require('../controllers/UsersController');

// Get All Users
router.get('/allusers', UserController.getAllUsers);

// Retrieve specific user from database
router.get('/:id', UserController.getUser);

// Add new user
router.post('/newuser', UserController.addNewUser);

// Update User
router.put('/updateuser/:id', UserController.verifyToken, UserController.updateUser)

// Delete User
router.delete('/deleteuser/:id', UserController.deleteUser);

module.exports = router;
