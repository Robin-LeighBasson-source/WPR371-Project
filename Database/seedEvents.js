const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Event = require('./models/Event');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () =>
{
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany();

    // Insert sample events
    await Event.insertMany([
        {
            title: 'Tech Innovation Summit',
            description: 'Explore the latest in AI and software development.',
            category: 'Technology',
            date: new Date('2026-06-15'),
            location: 'Johannesburg',
            totalCapacity: 300,
            ticketsSold: 120
        },
        {
            title: 'Music Festival 2026',
            description: 'Live performances from top local artists.',
            category: 'Music',
            date: new Date('2026-07-01'),
            location: 'Cape Town',
            totalCapacity: 500,
            ticketsSold: 340
        },
        {
            title: 'Business Networking Expo',
            description: 'Meet professionals and entrepreneurs.',
            category: 'Business',
            date: new Date('2026-08-10'),
            location: 'Pretoria',
            totalCapacity: 200,
            ticketsSold: 80
        }
        ]);

        console.log('Sample events inserted');

        mongoose.connection.close();
    }).catch(err =>
    {
        console.error(err);
    });