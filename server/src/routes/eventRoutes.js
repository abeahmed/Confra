const express = require('express');
const router = express.Router();
const { 
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  togglePublishStatus,
  getEventsByCategory,
  searchEvents,
  getUpcomingEvents
} = require('../controllers/eventController');
const { getEventBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const { eventValidation, validateRequest } = require('../middleware/validation');

// Public
router.get('/', getEvents);
router.get('/search', searchEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/category/:category', getEventsByCategory);
router.get('/:id', getEvent);

// Protected
router.post('/', protect, authorize('organizer', 'admin'), eventValidation, validateRequest, createEvent);
router.put('/:id', protect, authorize('organizer', 'admin'), eventValidation, validateRequest, updateEvent);
router.delete('/:id', protect, authorize('organizer', 'admin'), deleteEvent);
router.put('/:id/publish', protect, authorize('organizer', 'admin'), togglePublishStatus);
router.get('/:eventId/bookings', protect, authorize('organizer', 'admin'), getEventBookings);

module.exports = router; 