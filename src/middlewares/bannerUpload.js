const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'public/images/banners')
    },
    filename :  (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`)
    },
});

const bannerUpload = multer({
    storage,
});

module.exports = bannerUpload