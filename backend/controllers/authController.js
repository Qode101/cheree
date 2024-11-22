exports.googleCallback = (req, res) => {
  const { token } = req.user; // Extract token from req.user
  res.redirect(`http://localhost:4200/dashboard?token=${token}`);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};