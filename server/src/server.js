const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Connect to MongoDB 
let dbConnected = false;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected...');
    dbConnected = true;
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Running without database connectivity. Some features will not work.');
  });

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes'); 

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rsvp', rsvpRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Event Booking API',
    database: dbConnected ? 'Connected' : 'Disconnected',
    endpoints: {
      base: '/api',
      users: '/api/users',
      events: '/api/events',
      bookings: '/api/bookings'
    }
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    database: dbConnected ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  console.log('Unhandled rejection occurred, but server continues running.');
});

module.exports = app; 