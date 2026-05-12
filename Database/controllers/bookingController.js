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
            return res.send('Event not found.');
        }

        // Prevent overbooking
        if (event.ticketsSold >= event.totalCapacity)
        {
            return res.send('Event is fully booked.');
        }

        // Prevent duplicate bookings
        const existingBooking = await Booking.findOne(
        {
            user: req.session.user.id,
            event: eventId
        });

        if (existingBooking)
        {
            return res.send('You have already booked this event.');
        }

        // Make booking
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
        res.send('Booking error.');
    }
}; //createBooking

// Cancel booking
const cancelBooking = async (req, res) =>
{
    try
    {
        const booking = await Booking.findById(req.params.id);

        if (!booking)
        {
            return res.send('Booking not found.');
        }

        // Find related event
        const event = await Event.findById(booking.event);

        // Reduce tickets sold safely
        if (event && event.ticketsSold > 0)
        {
            event.ticketsSold -= 1;

            await event.save();
        }
        // Delete booking
        await Booking.findByIdAndDelete(req.params.id);

        res.redirect('/dashboard');
    } catch (err)
    {
        console.error(err);

        res.send('Error cancelling booking.');
    }
}; //cancelBooking

module.exports = { createBooking, cancelBooking };