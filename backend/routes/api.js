const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const authenticate = require('../middleware/authMiddleware');

// cookies
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// Root route for testing API connection
router.get('/', (req, res) => {
    res.send('From API route');
});

// protected route
router.get('/protected-route', authenticate, (req, res) => {
    res.status(200).send({ message: 'Protected route', user: req.user });
});


router.post('/sign-up', async (req, res) => {
    try {
        const userData = req.body;
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const user = new User({
            ...userData,
            password: hashedPassword,
        });

        const registeredUser = await user.save();

        const payload = { subject: registeredUser._id };
        const token = jwt.sign(payload, 'secretKey');

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).send({ message: 'Sign-Up Successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during sign-up.');
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid Email');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid Password');
        }

        const payload = { subject: user._id };
        const token = jwt.sign(payload, 'secretKey');

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).send({ message: 'Login Successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during login.');
    }
});

module.exports = router;