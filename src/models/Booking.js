const mongoose = require('mongoose');
const crypto = require('crypto');

const BookingSchema = new mongoose.Schema({
  bookingReference: {
    type: String,
    unique: true
  },
  bookingTime: {
    type: Date,
    default: Date.now
  },
  numberOfTickets: {
    type: Number,
    required: [true, 'Please add number of tickets'],
    min: [1, 'Must book at least 1 ticket']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please add total price']
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  cancelledAt: {
    type: Date
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: true
  }
});

// Generate booking reference before saving
BookingSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  const randomBytes = crypto.randomBytes(8).toString('hex');
  this.bookingReference = `BK-${randomBytes}`;
  
  next();
});

// Check if there are available tickets
BookingSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  const Event = this.model('Event');
  const event = await Event.findById(this.event);
  
  if (!event) {
    return next(new Error('Event not found'));
  }
  
  const bookings = await this.model('Booking')
    .find({ event: this.event })
    .select('numberOfTickets');

  const bookedTickets = bookings.reduce((total, booking) => 
    total + booking.numberOfTickets, 0);
  
  if (bookedTickets + this.numberOfTickets > event.capacity) {
    return next(new Error('Not enough tickets available'));
  }
  
  this.totalPrice = event.ticketPrice * this.numberOfTickets;
  
  next();
});

module.exports = mongoose.model('Booking', BookingSchema); 