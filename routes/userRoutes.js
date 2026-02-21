const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const {
  validateRegister,
  validateLogin,
} = require('../middleware/validateInput');
const { authLimiter } = require('../middleware/rateLimit');

router.post('/register', authLimiter, validateRegister, registerUser);
router.post('/login', authLimiter, validateLogin, loginUser);

module.exports = router;
