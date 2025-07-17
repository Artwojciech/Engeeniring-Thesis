const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, verifyRefreshToken } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', verifyRefreshToken, authController.refreshToken);
router.get('/current', verifyToken, authController.getCurrentUser);

module.exports = router;
