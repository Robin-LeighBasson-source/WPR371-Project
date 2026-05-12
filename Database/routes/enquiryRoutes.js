const express = require('express');
const router = express.Router();

const { getContactPage, submitEnquiry } = require('../controllers/enquiryController');

router.get('/', getContactPage);
router.post('/', submitEnquiry);

module.exports = router;