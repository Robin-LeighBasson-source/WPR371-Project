const Event = require('../models/Event');
const Booking = require('../models/Booking');

// Homepage events
const getAllEvents = async (req, res) =>
{
    try
    {
        const events = await Event.find().sort({ date: 1 });

        res.render('home',
        {
            title: 'Home',
            events
        });
    } catch (err)
    {
        console.error(err);
        res.send('Error loading events.');
    }
};

// Search/filter events
const searchEvents = async (req, res) =>
{
    try
    {
        const { search, category } = req.query;

        let query = {};

        // Search by title
        if (search)
        {
            query.title =
            {
                $regex: search,
                $options: 'i'
            };
        }

        // Filter by category
        if (category && category !== 'All')
        {
            query.category = category;
        }

        const events = await Event.find(query).sort({ date: 1 });

        res.render('home',
        {
            title: 'Search Results',
            events
        });
    } catch (err)
    {
        console.error(err);
        res.send('Search error.');
    }
}; //searchEvents

// Single event page
const getEventDetails = async (req, res) =>
{
    try
    {
        const event = await Event.findById(req.params.id);

        if (!event)
        {
            return res.send('Event not found.');
        }

        res.render('event-details',
        {
            title: event.title,
            event
        });

    } catch (err)
    {
        console.error(err);
        res.send('Error loading event.');
    }
}; //getEventDetails

// Admin event management page
const getAdminEvents = async (req, res) =>
{
    try
    {
        const events = await Event.find().sort({ date: 1 });
        
        // Get total bookings
        const totalBookings = await Booking.countDocuments();
        
        // Get total users
        const User = require('../models/User');
        const totalUsers = await User.countDocuments();
        
        // Get total enquiries
        const Enquiry = require('../models/Enquiry');
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        const pendingEnquiries = enquiries.length;
        
        // Add booking count for each event
        const eventsWithBookings = await Promise.all(
            events.map(async (event) => {
                const bookingCount = await Booking.countDocuments({ event: event._id });
                return {
                    ...event.toObject(),
                    bookingCount
                };
            })
        );

        res.render('admin-events',
        {
            title: 'Manage Events',
            events: eventsWithBookings,
            user: req.session.user,
            enquiries: enquiries,
            stats: {
                totalBookings,
                totalUsers,
                pendingEnquiries
            }
        });
    } catch (err)
    {
        console.error(err);
        res.send('Error loading admin events.');
    }
};

// Create new event
const createEvent = async (req, res) =>
{
    try
    {
        const
        {
            title,
            description,
            category,
            date,
            location,
            totalCapacity
        } = req.body;

        const newEvent = new Event(
        {
            title,
            description,
            category,
            date,
            location,
            totalCapacity
        });
        await newEvent.save();

        res.redirect('/events/admin/manage');
    } catch (err)
    {
        console.error(err);
        res.send('Error creating event.');
    }
}; //createEvent

// Delete event
const deleteEvent = async (req, res) =>
{
    try
    {
        // Prevent deleting events with bookings
        const existingBookings = await Booking.findOne({ event: req.params.id });

        if (existingBookings)
        {
            return res.send('Cannot delete event with existing bookings.');
        }

        await Event.findByIdAndDelete(req.params.id);

        res.redirect('/events/admin/manage');
    } catch (err)
    {
        console.error(err);
        res.send('Error deleting event.');
    }
}; //deleteEvent

// Render edit event form
const getEditEvent = async (req, res) =>
{
    try
    {
        const event = await Event.findById(req.params.id);

        if (!event)
        {
            return res.send('Event not found.');
        }

        res.render('edit-event',
        {
            title: 'Edit Event',
            event
        });
    } catch (err)
    {
        console.error(err);
        res.send('Error loading edit form.');
    }
};

// Update event
const updateEvent = async (req, res) =>
{
    try
    {
        const
        {
            title,
            category,
            description,
            location,
            date,
            totalCapacity
        } = req.body;

        await Event.findByIdAndUpdate(req.params.id,
        {
            title,
            category,
            description,
            location,
            date,
            totalCapacity
        });

        res.redirect('/events/admin/manage');
    } catch (err)
    {
        console.error(err);
        res.send('Error updating event.');
    }
}; //updateEvent

// Get event details as JSON
const getEventJSON = async (req, res) =>
{
    try
    {
        const event = await Event.findById(req.params.id);

        if (!event)
        {
            return res.status(404).json({ error: 'Event not found.' });
        }

        res.json(event);

    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: 'Error loading event.' });
    }
}; //getEventJSON

module.exports =
{
    getAllEvents,
    searchEvents,
    getEventDetails,
    getEventJSON,
    getAdminEvents, 
    createEvent,
    deleteEvent,
    getEditEvent,
    updateEvent
};