const express = require('express');
const router = express.Router();
const { 
  getBookings,
  getBooking,
  createBooking,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const { bookingValidation, validateRequest } = require('../middleware/validation');

// All booking routes require authentication
router.use(protect);

router.get('/', authorize('admin'), getBookings);

router.post('/', bookingValidation, validateRequest, createBooking);
router.get('/:id', getBooking);
router.put('/:id', updateBookingStatus);

module.exports = router; 