const express = require('express');
const passport = require('passport');
const { googleCallback, facebookCallback, logout } = require('../controllers/authController');

const router = express.Router();

// Google Auth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback
);

// Facebook Auth
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  facebookCallback
);

// Logout
router.get('/logout', logout);

module.exports = router;