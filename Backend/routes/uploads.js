const router = require('express').Router()
const uploadController = require('../controllers/UploadsController');
const beachController = require('../controllers/BeachController');
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

// upload a Beach image to filesystem
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

// upload a User image to file system
router.post('/userUploads', user_upload.single('file'), uploadController.uploadUserImage);

// upload user image to azure storage container
router.post('/azureblopuploaduser', uploadController.azureblobuploaduser);

// upload beach image to azure storage container


module.exports = router;
