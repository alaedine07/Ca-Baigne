const router = require('express').Router();
const BeachController = require('../controllers/BeachController');
const authcontroller = require('../controllers/authcontroller');


// Retrieve all beaches from database
router.get('/allbeaches', BeachController.getAllBeaches);

// Retrieve specific beach from database
router.get('/:id', BeachController.getBeach);

// Add new beach
// protect this route to be used only by admins
router.post('/newbeach', authcontroller.verifyUserIsAdmin, BeachController.addNewBeach);

// Update Beach
// protect this route to be used only by admins
router.put('/updatebeach/:id', authcontroller.verifyUserIsAdmin, BeachController.updateBeach)

// Delete Beach
// protect this route to be used only by admins
router.delete('/deletebeach/:id', authcontroller.verifyUserIsAdmin, BeachController.deleteBeach);

module.exports = router;
