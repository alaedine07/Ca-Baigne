const router = require('express').Router()
const controller = require('../controllers/controllers')
const UserController = require('../controllers/UsersController')
const BeachController = require('../controllers/BeachController')
const PostController = require('../controllers/PostController')
const API_URL = '/api/v1';

router.get(API_URL + '/version', controller.version);
router.get(API_URL + '/alaedine', controller.alaedine);
router.get(API_URL + '/users', UserController.User);
router.get(API_URL + '/beaches', BeachController.Beach);
router.get(API_URL + '/posts', PostController.Post);

module.exports = router;
