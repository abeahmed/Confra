const Booking = require('../models/Booking');
const Event = require('../models/Event');

/**
 * Get all bookings
 * @route GET /api/bookings
 * @access Private
 */
exports.getBookings = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'admin') {
      query = Booking.find();
    } else {
      query = Booking.find({ user: req.user.id });
    }

    query = query.populate({
      path: 'event',
      select: 'title startTime venue ticketPrice'
    }).populate({
      path: 'user',
      select: 'name email'
    });

    const bookings = await query;

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Get single booking
 * @route GET /api/bookings/:id
 * @access Private
 */
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: 'event',
      select: 'title description startTime endTime venue address ticketPrice'
    }).populate({
      path: 'user',
      select: 'name email'
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Create new booking
 * @route POST /api/bookings
 * @access Private
 */
exports.createBooking = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const event = await Event.findById(req.body.event);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    if (!event.isPublished) {
      return res.status(400).json({
        success: false,
        error: 'Cannot book an unpublished event'
      });
    }

    if (new Date(event.startTime) < new Date()) {
      return res.status(400).json({
        success: false,
        error: 'Cannot book a past event'
      });
    }

    const booking = await Booking.create(req.body);
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Update booking status
 * @route PUT /api/bookings/:id
 * @access Private
 */
exports.updateBookingStatus = async (req, res) => {
  try {
    if (!req.body.status) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a status to update'
      });
    }

    let booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (req.user.role !== 'admin') {
      if (booking.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this booking'
        });
      }
      
      if (req.body.status !== 'CANCELLED') {
        return res.status(403).json({
          success: false,
          error: 'Users can only cancel bookings'
        });
      }
    }

    if (req.body.status === 'CANCELLED' && booking.status !== 'CANCELLED') {
      booking.cancelledAt = Date.now();
    }

    booking.status = req.body.status;
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Get bookings for an event
 * @route GET /api/events/:eventId/bookings
 * @access Private (Admin or Event Organizer)
 */
exports.getEventBookings = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view bookings for this event'
      });
    }

    const bookings = await Booking.find({ event: req.params.eventId })
      .populate({
        path: 'user',
        select: 'name email'
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Get user's bookings
 * @route GET /api/users/bookings
 * @access Private
 */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: 'event',
        select: 'title startTime venue ticketPrice'
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}; 