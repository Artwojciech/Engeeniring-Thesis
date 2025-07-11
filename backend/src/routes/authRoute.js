const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, verifyRefreshToken } = require('../middleware/authMiddleware');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh-token', verifyRefreshToken, authController.refreshToken);
router.get('/auth/current', verifyToken, authController.getCurrentUser);

module.exports = router;
