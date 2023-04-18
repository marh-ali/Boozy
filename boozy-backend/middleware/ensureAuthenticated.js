function ensureAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.status(401).json({ message: "User not authenticated" });
  }
}

module.exports = ensureAuthenticated;
