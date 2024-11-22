const express = require('express');
const passport = require('passport');
const { googleCallback, logout } = require('../controllers/authController');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleCallback);
router.get('/logout', logout);

module.exports = router;