const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2; // Use v2 directly
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Upload Route
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded" });
        }

        const file = req.files.file;

        cloudinary.uploader.upload(file.tempFilePath, { folder: 'test' }, async (err, result) => {
            if (err) {
                removeTmp(file.tempFilePath);
                return res.status(500).json({ msg: err.message });
            }

            removeTmp(file.tempFilePath);
            res.json({ public_id: result.public_id, url: result.secure_url });
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Destroy Route
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: "No images selected" });

        cloudinary.uploader.destroy(public_id, async (err, result) => {
            if (err) return res.status(500).json({ msg: err.message });

            res.json({ msg: "Deleted" });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Remove temporary file
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    });
};

module.exports = router;
