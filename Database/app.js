const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

// Import models
const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const Enquiry = require('./models/Enquiry');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize app
const app = express();
dotenv.config(); 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parsing

app.use(methodOverride('_method')); // POST --> PUT/DELETE

app.use(session( // enable authentication tracking
{
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
}));

// Makes user global
app.use((req, res, next) =>
{
    res.locals.user = req.session.user || null;
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Layout configuration
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/events', eventRoutes);
app.use('/auth', authRoutes);

app.get('/', async (req, res) =>
{
    try
    {
        const events = await Event.find();

        res.render('home',
        {
            title: 'Home',
            events
        });

    } catch (err)
    {
        console.error(err);
        res.send('Error loading homepage.');
    }
});

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