const Event = require('../models/Event');

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
        res.send('Error loading events');
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
        res.send('Search error');
    }
};

// Single event page
const getEventDetails = async (req, res) =>
{
    try
    {
        const event = await Event.findById(req.params.id);

        if (!event)
        {
            return res.send('Event not found');
        }

        res.render('event-details',
        {
            title: event.title,
            event
        });

    } catch (err)
    {
        console.error(err);
        res.send('Error loading event');
    }
};

module.exports = { getAllEvents, searchEvents, getEventDetails };