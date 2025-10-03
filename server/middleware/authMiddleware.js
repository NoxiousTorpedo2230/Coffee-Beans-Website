// const jwt = require('jsonwebtoken');
// const { User } = require('../models/models');

// // Authentication middleware
// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);
    
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }
    
//     req.user = { userId: user._id, role: user.role };
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Admin middleware
// const adminMiddleware = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin access required' });
//   }
//   next();
// };

// // Staff middleware (for staff or admin)
// const staffMiddleware = (req, res, next) => {
//   if (req.user.role !== 'admin' && req.user.role !== 'staff') {
//     return res.status(403).json({ message: 'Staff access required' });
//   }
//   next();
// };

// module.exports = {
//   authMiddleware,
//   adminMiddleware,
//   staffMiddleware
// };

const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

// JWT Secret with fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_jwt_secret_key_for_development';

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Staff middleware (for staff or admin)
const staffMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'staff') {
    return res.status(403).json({ message: 'Staff access required' });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  staffMiddleware
};