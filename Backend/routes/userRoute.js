const router = require('express').Router()
const UserController = require('../controllers/UsersController');
const FavoritesController = require('../controllers/FavoritesController')

// Get All Users
router.get('/allusers', UserController.getAllUsers);

// Retrieve specific user from database
router.get('/:id', UserController.getUser);

// Add new user
router.post('/newuser', UserController.addNewUser);

// Update User
router.put('/updateuser/:id', UserController.verifyToken, UserController.updateUser)

// Pin beach as favorite
router.post('/pinned', UserController.verifyToken, FavoritesController.pinBeach);

// Unpin beach as favorite

router.delete('/unpin/:id', UserController.verifyToken, FavoritesController.removePinnedBeach)

// Get all pinned beaches

router.get('/allpinnedbeaches/:id', FavoritesController.getAllPinnedBeaches);

// Delete User
router.delete('/deleteuser/:id', UserController.deleteUser);

module.exports = router;
