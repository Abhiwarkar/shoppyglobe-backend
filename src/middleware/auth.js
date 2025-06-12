/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */
const { verifyToken } = require('../config/jwt');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

/**
 * Protect routes - Verify user is authenticated
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = verifyToken(token);

    // Set user in request
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
    
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }
});

/**
 * Authorize specific roles
 * @param {...String} roles - Roles to authorize
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('Not authorized to access this route');
    }
    next();
  };
};