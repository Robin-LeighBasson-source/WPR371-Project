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

// Render register page
const getRegister = (req, res) =>
{
    res.render('register',
    {
        title: 'Register',
        error: null
    });
};

// Handle user login
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

// Register user
const registerUser = async (req, res) =>
{
    try
    {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser)
        {
            return res.render('register',
            {
                title: 'Register',
                error: 'Email already exists.'
            });
        }

        const newUser = new User({ name, email, password });

        await newUser.save();

        res.redirect('/auth/login');

    } catch (err)
    {
        console.error(err);

        res.render('register',
        {
            title: 'Register',
            error: 'Registration failed.'
        });
    }
}; //registerUser

// Logout
const logoutUser = (req, res) =>
{
    req.session.destroy(() =>
    {
        res.redirect('/auth/login');
    });
};

module.exports = { getLogin, loginUser, logoutUser, getRegister, registerUser };