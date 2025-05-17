const { validationResult, body } = require('express-validator');

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg
      }))
    });
  }
  next();
};

exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot be more than 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['user', 'organizer', 'admin']).withMessage('Invalid role'),
  body('phone')
    .optional()
    .isLength({ max: 20 }).withMessage('Phone number cannot be longer than 20 characters')
];

exports.loginValidation = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail(),
  body('password').trim().notEmpty().withMessage('Password is required')
];

exports.eventValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description cannot be more than 2000 characters'),
  body('startTime')
    .notEmpty().withMessage('Start time is required')
    .isISO8601().withMessage('Start time must be a valid date'),
  body('endTime')
    .notEmpty().withMessage('End time is required')
    .isISO8601().withMessage('End time must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  body('venue')
    .trim()
    .notEmpty().withMessage('Venue is required')
    .isLength({ max: 100 }).withMessage('Venue cannot be more than 100 characters'),
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required')
    .isLength({ max: 200 }).withMessage('Address cannot be more than 200 characters'),
  body('capacity')
    .notEmpty().withMessage('Capacity is required')
    .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('ticketPrice')
    .notEmpty().withMessage('Ticket price is required')
    .isFloat({ min: 0 }).withMessage('Ticket price must be at least 0'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['CONFERENCE', 'SEMINAR', 'WORKSHOP', 'NETWORKING', 'CULTURAL', 'SPORTS', 'OTHER'])
    .withMessage('Invalid category')
];

exports.bookingValidation = [
  body('numberOfTickets')
    .notEmpty().withMessage('Number of tickets is required')
    .isInt({ min: 1 }).withMessage('Number of tickets must be at least 1'),
  body('event')
    .notEmpty().withMessage('Event ID is required')
    .isMongoId().withMessage('Invalid event ID')
]; 