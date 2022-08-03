const router = require('express').Router()
const BeachController = require('../controllers/BeachController')

// api endpoints version 1
const API_URL = '/api/v1';

//Get all beaches
router.get(API_URL + '/', BeachController.Beach);

module.exports = router;