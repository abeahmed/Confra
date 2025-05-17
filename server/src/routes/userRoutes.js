const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  logout
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

// Protected 
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.get('/bookings', protect, getUserBookings);

module.exports = router; 