const express = require('express');
const router = express.Router();

// GET all events
router.get('/', (req,res) =>
{
    res.send("Events route operational.")
});

module.exports = router;