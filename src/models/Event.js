const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  startTime: {
    type: Date,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: Date,
    required: [true, 'Please add an end time']
  },
  venue: {
    type: String,
    required: [true, 'Please add a venue'],
    maxlength: [100, 'Venue cannot be more than 100 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
    maxlength: [200, 'Address cannot be more than 200 characters']
  },
  capacity: {
    type: Number,
    required: [true, 'Please add a capacity'],
    min: [1, 'Capacity must be at least 1']
  },
  ticketPrice: {
    type: Number,
    required: [true, 'Please add a ticket price'],
    min: [0, 'Ticket price must be at least 0']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'CONFERENCE',
      'SEMINAR',
      'WORKSHOP',
      'NETWORKING',
      'CULTURAL',
      'SPORTS',
      'OTHER'
    ]
  },
  imageUrl: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

EventSchema.virtual('availableTickets').get(async function() {
  const bookings = await this.model('Booking')
    .find({ event: this._id })
    .select('numberOfTickets');
  
  const bookedTickets = bookings.reduce((total, booking) => 
    total + booking.numberOfTickets, 0);
  
  return this.capacity - bookedTickets;
});

// Create index to enable efficient searching
EventSchema.index({ title: 'text', description: 'text', venue: 'text' });
EventSchema.index({ category: 1 });
EventSchema.index({ startTime: 1 });

EventSchema.pre('save', function(next) {
  if (this.endTime <= this.startTime) {
    const error = new Error('End time must be after start time');
    next(error);
  } else {
    next();
  }
});

module.exports = mongoose.model('Event', EventSchema); 