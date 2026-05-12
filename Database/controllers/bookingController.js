const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Create booking
const createBooking = async (req, res) =>
{
    try
    {
        const eventId = req.body.eventId;
        const event = await Event.findById(eventId);

        if (!event)
        {
            return res.send('Event not found');
        }

        // Prevent overbooking
        if (event.ticketsSold >= event.totalCapacity)
        {
            return res.send('Event is fully booked');
        }

        // Create booking
        const booking = new Booking(
        {
            user: req.session.user.id,
            event: eventId
        });
        await booking.save();

        // Update tickets sold
        event.ticketsSold += 1;
        await event.save();

        res.redirect('/dashboard');
    } catch (err)
    {
        console.error(err);
        res.send('Booking error');
    }
};

module.exports = { createBooking };