const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photosController');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/roleMiddleware')

router.get('/:id', photoController.getPhoto);
router.get('/category/:categoryName', photoController.getPhotosByCategory);
router.post('/', verifyToken, verifyAdmin, upload.array('files', 10), photoController.addPhotos);
router.put('/:id', verifyToken, verifyAdmin, photoController.editPhoto);
router.delete('/:id', verifyToken, verifyAdmin, photoController.deletePhoto);

module.exports = router;
