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

// upload a user related post
router.post('/beachesUploads', upload.single('file'), beachController.addNewBeach);

// upload a beach related post
// router.post('/beachesUpload');

module.exports = router;