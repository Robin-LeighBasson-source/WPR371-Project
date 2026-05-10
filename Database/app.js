const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import models
const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const Enquiry = require('./models/Enquiry');
const eventRoutes = require('./routes/eventRoutes');

// Initialize app
const app = express();
dotenv.config(); 

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs'); 
app.use('/events', eventRoutes);

// DATABASE CONNECTION
const dbURI = process.env.MONGO_URI; 

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((err) => console.log('Database connection error:', err));

// TEMPORARY TEST FUNCTION
async function createTestAdmin() {
    try {
        const existingUser = await User.findOne({ email: 'admin@smartevents.com' });
        if (!existingUser) {
            const newAdmin = new User({
                name: 'System Admin',
                email: 'admin@smartevents.com',
                password: 'SuperSecretPassword123!', 
                role: 'admin'
            });
            await newAdmin.save();
            console.log('Test Admin created successfully! Check Atlas to see the hashed password.');
        } else {
            console.log('Test Admin already exists in the database.');
        }
    } catch (err) {
        console.error('Error creating test admin:', err);
    }
}

createTestAdmin();