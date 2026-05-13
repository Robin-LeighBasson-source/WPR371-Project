const express = require('express');
const router = express.Router();

const requireAdmin = require('../middleware/roleMiddleware');
const
{
    searchEvents,
    getEventDetails,
    getEventJSON,
    getAdminEvents,
    createEvent,
    deleteEvent,
    getEditEvent,
    updateEvent
} = require('../controllers/eventController');

// Search/filter route
router.get('/search', searchEvents);
// Admin dashboard
router.get('/admin/manage', requireAdmin, getAdminEvents);
// Create event
router.post('/admin/create', requireAdmin, createEvent);
// Delete event
router.post('/admin/delete/:id', requireAdmin, deleteEvent);
// Edit form
router.get('/admin/edit/:id', requireAdmin, getEditEvent);
// Update event
router.post('/admin/edit/:id', requireAdmin, updateEvent);
// API endpoint for event JSON
router.get('/api/:id', getEventJSON);
// Single event page
router.get('/:id', getEventDetails);

module.exports = router;