const jwt = require('jsonwebtoken');

// Google Callback
exports.googleCallback = (req, res) => {
  // Generate a token for the authenticated user
  const token = jwt.sign(
    { id: req.user.user.id, email: req.user.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Redirect to the dashboard with the token
  res.redirect(`http://localhost:4200/dashboard?token=${token}`);
};

// Facebook Callback
exports.facebookCallback = (req, res) => {
  // Generate a token for the authenticated user
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Redirect to the dashboard with the token
  res.redirect(`http://localhost:4200/dashboard?token=${token}`);
};

// Logout
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};