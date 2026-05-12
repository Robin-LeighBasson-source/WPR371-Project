const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');
const { createBooking } = require('../controllers/bookingController');

router.post('/create', requireAuth, createBooking);

module.exports = router;