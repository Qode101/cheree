const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
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

// Register users
// router.post('/sign-up', async (req, res) => {
//     const userData = req.body;
//     const user = new User(userData);
//     try {
//         const registeredUser = await user.save();
//         res.status(200).send(registeredUser);
//     } catch (error) {
//         console.error('Error saving user:', error);
//         res.status(500).send('Error registering user');
//     }
// });

router.post('/sign-up', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            res.status(200).send({ message: 'Sign in Successfull! '})
        }
    })
})

// Log-in user
// router.post('/login', async (req, res) => {
//     const userData = req.body;
//     try {
//         const user = await User.findOne({ email: userData.email });

//         if (!user) {
//             res.status(401).send('Invalid email');
//         } else if (user.password !== userData.password) {
//             res.status(401).send('Invalid password');
//         } else {
//             res.status(200).send(user);
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal server error');
//     }
// });

router.post('/login', (req, res) => {
    let userData =req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else
            if (user.passord !== userData.password) {
                res.status(401).send('Invalid Password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')

                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.status(200).send({ message: 'Login successful! '})
            }
        }
    })
})

module.exports = router;