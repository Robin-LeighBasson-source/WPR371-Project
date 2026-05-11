const User = require('../models/User');
const bcrypt = require('bcrypt');

// Render login page
const getLogin = (req, res) =>
{
    res.render('auth',
    {
        title: 'Login',
        error: null
    });
};

// Handle login
const loginUser = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
        {
            return res.render('auth',
            {
                title: 'Login',
                error: 'Invalid email or password.'
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match)
        {
           return res.render('auth',
            {
                title: 'Login',
                error: 'Invalid email or password.'
            });
        }

        req.session.user =
        {
            id: user._id,
            name: user.name,
            role: user.role
        };

        res.redirect('/dashboard');

    } catch (err)
    {
        console.error(err);
        res.send('Login error.');
    }
}; //loginUser

// Logout
const logoutUser = (req, res) =>
{
    req.session.destroy(() =>
    {
        res.redirect('/auth/login');
    });
};

module.exports =
{
    getLogin,
    loginUser,
    logoutUser
};