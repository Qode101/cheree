const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Root route for testing API connection
router.get('/', (req, res) => {
    res.send('From API route');
});

// Register users
router.post('/sign-up', async (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    try {
        const registeredUser = await user.save();
        res.status(200).send(registeredUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
    }
});

// Log-in user
router.post('/login', async (req, res) => {
    const userData = req.body;
    try {
        const user = await User.findOne({ email: userData.email });

        if (!user) {
            res.status(401).send('Invalid email');
        } else if (user.password !== userData.password) {
            res.status(401).send('Invalid password');
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;