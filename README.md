https://github.com/Robin-LeighBasson-source/WPR371-Project

# Smart Events Management System

A modern, full-stack web application for event management, built with Node.js, Express, MongoDB, and EJS. This system allows users to browse, book, and manage events while providing administrators with comprehensive event management tools.

## Features

### For Users
- **Browse Events**: View all available events with detailed information
- **Search & Filter**: Find events by title or category
- **User Authentication**: Secure registration and login system
- **Event Booking**: Book tickets for events with capacity management
- **Personal Dashboard**: View booked events and manage bookings
- **Contact Support**: Submit enquiries through the contact form

### For Administrators
- **Admin Dashboard**: Comprehensive overview with statistics
- **Event Management**: Create, edit, and delete events
- **User Management**: View total users and system statistics
- **Enquiry Management**: View and manage user enquiries
- **Booking Analytics**: Monitor booking trends and capacity usage

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine, CSS3
- **Authentication**: Express sessions with bcrypt password hashing
- **Styling**: Custom CSS with glassmorphism design
- **Middleware**: Method override, express layouts, session management

## Project Structure

```
WPR371-Project/
├── Database/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── bookingController.js   # Booking management
│   │   ├── enquiryController.js   # Contact form handling
│   │   └── eventController.js     # Event CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js      # Authentication middleware
│   │   └── roleMiddleware.js      # Admin role checking
│   ├── models/
│   │   ├── Booking.js             # Booking schema
│   │   ├── Enquiry.js             # Contact enquiry schema
│   │   ├── Event.js               # Event schema
│   │   └── User.js                # User schema
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css          # Main stylesheet
│   │   └── js/
│   │       └── scene.js           # WebGL background effects
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication routes
│   │   ├── bookingRoutes.js       # Booking routes
│   │   ├── enquiryRoutes.js       # Contact routes
│   │   └── eventRoutes.js         # Event routes
│   ├── views/
│   │   ├── admin-events.ejs       # Admin dashboard
│   │   ├── auth.ejs               # Login/register forms
│   │   ├── contact.ejs            # Contact page
│   │   ├── dashboard.ejs          # User dashboard
│   │   ├── edit-event.ejs         # Edit event form
│   │   ├── event-details.ejs      # Individual event page
│   │   ├── home.ejs               # Homepage with events
│   │   ├── layout.ejs             # Main layout template
│   │   └── register.ejs           # Registration form
│   ├── app.js                     # Main application file
│   ├── package.json               # Dependencies and scripts
│   └── seedEvents.js              # Database seeding script
├── WPR371_Project/                # Additional project files
└── README.md                      # This file
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user')
}
```

### Event Model
```javascript
{
  title: String (required),
  description: String,
  category: String,
  date: Date (required),
  location: String,
  totalCapacity: Number (required),
  ticketsSold: Number (default: 0)
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: 'User'),
  event: ObjectId (ref: 'Event'),
  bookingDate: Date (default: Date.now)
}
```

### Enquiry Model
```javascript
{
  name: String (required),
  email: String (required),
  subject: String,
  message: String (required),
  createdAt: Date (default: Date.now)
}
```

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Robin-LeighBasson-source/WPR371-Project.git
   cd WPR371-Project/Database
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the Database directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/smart-events
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-events
   ```

4. **Start MongoDB**
   Make sure MongoDB is running locally or your cloud instance is accessible.

5. **Seed the database** (optional)
   ```bash
   node seedEvents.js
   ```

6. **Start the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

##  Default Admin Account

After running the seed script, you can create an admin account by:
1. Registering a new user account
2. Manually updating the user's role in MongoDB to 'admin'

Or modify the registration logic to allow admin account creation.

##  Design Features

- **Glassmorphism UI**: Modern glass-like design with backdrop blur effects
- **Dark/Light Theme**: Automatic theme switching with CSS custom properties
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **WebGL Background**: Animated particle effects using Three.js
- **Smooth Animations**: CSS transitions and reveal animations

##  API Endpoints

### Authentication
- `GET /auth/login` - Login page
- `POST /auth/login` - User login
- `GET /auth/register` - Registration page
- `POST /auth/register` - User registration
- `GET /auth/logout` - User logout

### Events
- `GET /` - Homepage with events
- `GET /events/search` - Search events
- `GET /events/:id` - Event details
- `GET /events/api/:id` - Event JSON data

### Admin Routes (Protected)
- `GET /events/admin/manage` - Admin dashboard
- `POST /events/admin/create` - Create event
- `GET /events/admin/edit/:id` - Edit event form
- `POST /events/admin/edit/:id` - Update event
- `POST /events/admin/delete/:id` - Delete event

### Bookings (Protected)
- `POST /bookings/create` - Create booking
- `POST /bookings/cancel/:id` - Cancel booking

### Contact
- `GET /contact` - Contact page
- `POST /contact` - Submit enquiry

##  Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Session Management**: Express sessions for authentication
- **Input Validation**: Server-side validation for all forms
- **Role-based Access**: Admin-only routes protected by middleware
- **SQL Injection Prevention**: Mongoose ODM sanitizes queries

##  Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Event browsing and search
- [ ] Event booking and cancellation
- [ ] Admin event management
- [ ] Contact form submission
- [ ] Responsive design on mobile
- [ ] Theme switching functionality

### Sample Data
Run `node seedEvents.js` to populate the database with sample events.

##  Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
SESSION_SECRET=your_secure_session_secret
PORT=3000
```

### Deployment Steps
1. Set up a MongoDB database (local or cloud)
2. Configure environment variables
3. Run `npm install --production`
4. Start the server with `npm start`
5. Set up a reverse proxy (nginx) for production

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Authors

- **Sean**
- **Robin**
- **Tanya**
- **Ryno**
- **Jordan**

##  Acknowledgments

- Built as part of WPR371 Web Programming course
- Inspired by modern event management platforms
- Uses open-source libraries and frameworks
- Special thanks to the Node.js and MongoDB communities

---
