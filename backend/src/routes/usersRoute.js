const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { verifyToken } = require('../middleware/authMiddleware');

router.put('/:id/username', verifyToken, userController.changeUsername);
router.put('/:id/password', verifyToken, userController.changePassword);

module.exports = router;
