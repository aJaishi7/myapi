// const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Error = require('../utilities/ErrorHandler');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + '-' + ext);
    }
});

const filterImage = (req, file, callback) => {
    const filter = file.originalname.match(/\.(jpg|jpeg|png|gif)$/);
    if (!filter) {
        callback(new Error("Please Upload Image", 400), false);
    }
    callback(null, true);
}

const upload = multer({storage: storage, fileFilter: filterImage});
router.post(
    upload.single('photo'),
    (req
        , res) => {
        res.status(200).json(req.file);

    });

module.exports = upload;
