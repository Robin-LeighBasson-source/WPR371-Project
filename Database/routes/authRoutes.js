const express = require('express');
const router = express.Router();
const 
{
    getLogin,
    loginUser,
    logoutUser
} = require('../controllers/authController');

router.get('/login', getLogin);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;