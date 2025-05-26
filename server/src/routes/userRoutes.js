const express = require('express');
const router = express.Router();

const { 
  register, 
  login, 
  getMe, 
  logout,
  forgotPassword,
  verifyCode,
  resetPassword
} = require('../controllers/authController');
const { getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { 
  registerValidation, 
  loginValidation, 
  validateRequest 
} = require('../middleware/validation');

// Public 
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-code', verifyCode);

// Protected 
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.get('/bookings', protect, getUserBookings);

module.exports = router; 