/**
 * Product Routes
 * Handles product management operations
 */
const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { productRules, validate } = require('../middleware/validation');

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProduct);

// Protected admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  productRules,
  validate,
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  productRules,
  validate,
  updateProduct
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  deleteProduct
);

module.exports = router;