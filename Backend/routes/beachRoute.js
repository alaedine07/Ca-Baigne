const router = require('express').Router()
const BeachController = require('../controllers/BeachController')


// Retrieve all beaches from database
router.get('/allbeaches', BeachController.getAllBeaches);

// Retrieve specific beach from database
router.get('/:id', BeachController.getBeach);

// Add new beach
// protect this route to be used only by admins
router.post('/newbeach', BeachController.addNewBeach);

// Update Beach
// protect this route to be used only by admins
router.put('/updatebeach/:id', BeachController.updateBeach)

// Delete Beach
// protect this route to be used only by admins
router.delete('/deletebeach/:id', BeachController.deleteBeach);

module.exports = router;