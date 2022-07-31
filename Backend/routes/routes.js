const controller = require('../controllers/controllers')
const router = require('express').Router()

const API_URL = '/api/v1';

router.get(API_URL + '/version', controller.version);
router.get(API_URL + '/alaedine', controller.alaedine);

module.exports = router;