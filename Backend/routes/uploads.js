const router = require('express').Router()
const uploadController = require('../controllers/UploadsController');
const beachController = require('../controllers/BeachController');
const UserController = require('../controllers/UsersController');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, path.join(__dirname, '../uploads/beaches'));
    },
    filename: (req, file, callBack) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callBack(null, 'image' + '-' + fileName)
    }
});

const upload = multer({
    storage: storage
})

// upload a Beach image
// add protection to this route to be used by admins only
router.post('/beachesUploads', upload.single('file'), beachController.addNewBeach);

const user_storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, path.join(__dirname, '../uploads/users'));
    },
    filename: (req, file, callBack) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callBack(null, 'image' + '-' + fileName)
    }
});

const user_upload = multer({
    storage: user_storage
})

// upload a User image
router.post('/userUploads', user_upload.single('file'), uploadController.uploadBeachImage);


module.exports = router;
