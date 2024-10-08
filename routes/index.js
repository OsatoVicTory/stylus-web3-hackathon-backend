const express = require("express");
const router = express.Router();
const upload = require("../controllers/multer");
const cloudinary = require("../controllers/upload");

router.get('/get_data', cloudinary.getData);

router.get("/delete_uploaded_file/:public_id/:resource_type", cloudinary.deleteUploadedFile);

router.post("/upload_contents_file", upload.single('file'), cloudinary.uploadContentsFile);

router.post("/upload_users_file", upload.single('file'), cloudinary.uploadUsersFile);

module.exports = router;