const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');
const { createBooking, cancelBooking } = require('../controllers/bookingController');

// Make booking
router.post('/create', requireAuth, createBooking);
// Cancel booking
router.post('/cancel/:id', requireAuth, cancelBooking);

module.exports = router;