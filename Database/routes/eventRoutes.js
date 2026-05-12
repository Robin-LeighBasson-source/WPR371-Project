const express = require('express');
const router = express.Router();

const { searchEvents, getEventDetails } = require('../controllers/eventController');

// Search/filter route
router.get('/search', searchEvents);
// Single event page
router.get('/:id', getEventDetails);

module.exports = router;