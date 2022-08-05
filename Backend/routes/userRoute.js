const router = require('express').Router()
const UserController = require('../controllers/UsersController')

// Get All Users
router.post('/allusers', UserController.getAllUsers);

// Retrieve specific user from database
router.get('/:id', UserController.getUser);

// Add new user
router.post('/newpost', UserController.addNewUser);

// Update User
router.put('/updatepost/:id', UserController.updateUser)

// Delete User
router.delete('/deletepost/:id', UserController.deleteUser);

module.exports = router;
