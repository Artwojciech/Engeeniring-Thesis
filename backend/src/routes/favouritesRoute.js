const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favouritesController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, favouriteController.getFavourites);
router.post('/:photoId', verifyToken, favouriteController.addFavourite);
router.delete('/:photoId', verifyToken, favouriteController.deleteFavourite);

module.exports = router;
