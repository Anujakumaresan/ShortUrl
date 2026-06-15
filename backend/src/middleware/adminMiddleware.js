const adminMiddleware = (req, res, next) => {
  // authMiddleware should run before this, so req.user exists
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = adminMiddleware;
