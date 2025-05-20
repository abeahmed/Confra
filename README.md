# Event Booking App

A full-stack event booking and management application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Role-based access control (User, Organizer, Admin)
- Event creation and management
- Booking system with automated ticket availability checks
- Modern, responsive UI with dark mode
- Real-time form validation
- Error handling and loading states

## Tech Stack

### Frontend
- **Framework**: React
- **Routing**: React Router
- **State Management**: React Context
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: helmet, bcrypt

## Project Structure

client/  # Frontend React application
server/ # Backend Node.js/Express application


## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas)

### Running the Application

1. Clone the repository
```bash
git clone https://github.com/yourusername/event-booking-app.git
cd event-booking-app
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/event-booking
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=30d
```

4. Start the development servers
```bash
# Start the backend server (from server directory)
npm run dev

# Start the frontend development server (from client directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000


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
