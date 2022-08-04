const router = require('express').Router()
const BeachController = require('../controllers/BeachController')


// Test if the Beaches route is working
router.get('/TestBeachesRoute', BeachController.BeachTest);

// Retrieve all beaches from database
router.get('/allbeaches', BeachController.GetAllBeaches);

// Add new beach
router.post('/newbeach', BeachController.AddNewBeach);

module.exports = router;