const router = require('express').Router()
const BeachController = require('../controllers/BeachController')


// Retrieve all beaches from database
router.get('/allbeaches', BeachController.getAllBeaches);

// Retrieve specific beach from database
router.get('/:id', BeachController.getBeach);

// Add new beach
router.post('/newbeach', BeachController.addNewBeach);

// Update Beach
router.put('/updatebeach/:id', BeachController.updateBeach)

// Delete Beach
router.delete('/deletebeach/:id', BeachController.deleteBeach);

module.exports = router;