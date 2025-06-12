/**
 * Validation Middleware
 * Validates request data using express-validator
 */
const { body, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

/**
 * Registration validation rules
 */
exports.registerRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please include a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

/**
 * Login validation rules
 */
exports.loginRules = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please include a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Product validation rules
 */
exports.productRules = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('brand')
    .notEmpty()
    .withMessage('Brand is required'),
  body('thumbnail')
    .notEmpty()
    .withMessage('Thumbnail image is required')
    .isURL()
    .withMessage('Thumbnail must be a valid URL')
];

/**
 * Cart validation rules
 */
exports.cartItemRules = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];