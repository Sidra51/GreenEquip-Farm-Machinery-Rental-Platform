const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const generateToken = (userId, role) => {
  // no expiry since you don't want it
  return jwt.sign({ userId, role }, JWT_SECRET);
};

const verifyToken = (req, res, next) => {
  console.log(`[Auth Debug] Verifying token for ${req.originalUrl}`);
  const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    console.log('[Auth Debug] No token found, redirecting to login');
    // Redirect to the appropriate login based on the path if possible, or default to farmer for now as it's the most common
    if (req.originalUrl.includes('/seller')) {
        return res.redirect('/auth/login/seller');
    } else if (req.originalUrl.includes('/admin')) {
        return res.redirect('/auth/login/admin');
    }
    return res.redirect('/auth/login/farmer');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('[Auth Debug] Token verified for user:', decoded.userId, 'Role:', decoded.role);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('[Auth Debug] Token verification failed:', error.message);
    res.clearCookie('token');
    return res.redirect('/auth/login/farmer');
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log('No user in request');
      return res.redirect('/auth/login/farmer');
    }
    
    if (!roles.includes(req.user.role)) {
      console.log('User role not authorized:', req.user.role, 'Required:', roles);
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};

const requireFarmer = requireRole(['farmer']);
const requireSeller = requireRole(['seller']);
const requireAdmin = requireRole(['admin']);

module.exports = {
  generateToken,
  verifyToken,
  requireRole,
  requireFarmer,
  requireSeller,
  requireAdmin,
  JWT_SECRET
};