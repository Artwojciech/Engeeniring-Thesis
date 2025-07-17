const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photosController');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/:id', photoController.getPhoto);
router.get('/category/:categoryId', photoController.getPhotosByCategory);
router.post('/', verifyToken, verifyAdmin, upload.single('file'), photoController.addPhoto);
router.put('/:id', verifyToken, verifyAdmin, photoController.editPhoto);
router.delete('/:id', verifyToken, verifyAdmin, photoController.deletePhoto);

module.exports = router;
