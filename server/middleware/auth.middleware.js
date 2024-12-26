const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        message: 'Authentication required',
        redirect: '/auth/google' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        message: 'User not found',
        redirect: '/auth/google'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Invalid token',
      redirect: '/auth/google'
    });
  }
}

module.exports = authMiddleware;