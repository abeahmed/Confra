const Event = require('../models/Event');

/**
 * Get all events
 * @route GET /api/events
 * @access Public
 */
exports.getEvents = async (req, res) => {
  try {
    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    if (!req.user || (req.user.role !== 'organizer' && req.user.role !== 'admin')) {
      reqQuery.isPublished = true;
    }

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let query = Event.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Event.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Populate with organizer details
    query = query.populate({
      path: 'organizer',
      select: 'name email'
    });

    const events = await query;

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: events.length,
      pagination,
      total,
      data: events
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Get single event
 * @route GET /api/events/:id
 * @access Public
 */
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate({
      path: 'organizer',
      select: 'name email'
    });

    event.attendeeCount = await event.totalAttendees;

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    // Hide unpublished events from non-organizers and non-admins
    if (!event.isPublished && 
        (!req.user || (req.user.role !== 'organizer' && req.user.role !== 'admin'))) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Create new event
 * @route POST /api/events
 * @access Private
 */
exports.createEvent = async (req, res) => {
  try {
    // Add user to req.body
    req.body.organizer = req.user.id;

    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Update event
 * @route PUT /api/events/:id
 * @access Private
 */
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this event'
      });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Delete event
 * @route DELETE /api/events/:id
 * @access Private
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this event'
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Publish or unpublish an event
 * @route PUT /api/events/:id/publish
 * @access Private
 */
exports.togglePublishStatus = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to publish/unpublish this event'
      });
    }

    // Toggle published
    event.isPublished = !event.isPublished;
    await event.save();

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Get events by category
 * @route GET /api/events/category/:category
 * @access Public
 */
exports.getEventsByCategory = async (req, res) => {
  try {
    const events = await Event.find({ 
      category: req.params.category.toUpperCase(),
      isPublished: true
    }).populate({
      path: 'organizer',
      select: 'name email'
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Search events
 * @route GET /api/events/search
 * @access Public
 */
exports.searchEvents = async (req, res) => {
  try {
    if (!req.query.keyword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a search term'
      });
    }

    const events = await Event.find({
      $text: { $search: req.query.keyword },
      isPublished: true
    }).populate({
      path: 'organizer',
      select: 'name email'
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
};

/**
 * Get upcoming events
 * @route GET /api/events/upcoming
 * @access Public
 */
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      startTime: { $gte: new Date() },
      isPublished: true
    })
    .sort('startTime')
    .limit(5)
    .populate({
      path: 'organizer',
      select: 'name email'
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Something went wrong.'
    });
  }
}; 