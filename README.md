# Event Booking API

REST API for event booking and management built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Role-based access control (User, Organizer, Admin)
- Event creation and management
- Booking system with automated ticket availability checks
- Advanced search and filtering options
- RESTful API with comprehensive endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: helmet, bcrypt

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user profile
- `POST /api/users/logout` - Logout user

### Events
- `GET /api/events` - Get all events (with pagination and filtering)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (Organizer/Admin only)
- `PUT /api/events/:id` - Update event (Organizer/Admin only)
- `DELETE /api/events/:id` - Delete event (Organizer/Admin only)
- `PUT /api/events/:id/publish` - Publish/unpublish event (Organizer/Admin only)
- `GET /api/events/category/:category` - Get events by category
- `GET /api/events/search` - Search events
- `GET /api/events/upcoming` - Get upcoming events

### Bookings
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status
- `GET /api/events/:eventId/bookings` - Get bookings for an event (Organizer/Admin only)
- `GET /api/users/bookings` - Get current user's bookings

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas)

### Running the API

1. Clone the repository
```bash
git clone https://github.com/yourusername/event-booking-app.git
cd event-booking-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/event-booking
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=30d
```

4. Start the server
```bash
# Development mode with nodemon (auto-restart)
npm run dev

# Production mode
npm start
```

## Usage Examples

### Register a new user
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}' http://localhost:3000/api/users/register
```

### Login
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "email": "john@example.com",
  "password": "password123"
}' http://localhost:3000/api/users/login
```

### Create an event (requires authentication)
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN" -d '{
  "title": "Tech Conference 2023",
  "description": "Annual technology conference",
  "startTime": "2023-12-01T09:00:00.000Z",
  "endTime": "2023-12-01T17:00:00.000Z",
  "venue": "Convention Center",
  "address": "123 Main St, City",
  "capacity": 200,
  "ticketPrice": 99.99,
  "category": "CONFERENCE"
}' http://localhost:3000/api/events
```

## Project Structure

```
/src
  /config       - Configuration files
  /controllers  - Request handlers
  /middleware   - Custom middleware
  /models       - Database models
  /routes       - API routes
  /utils        - Utility functions
  server.js     - Entry point
```
