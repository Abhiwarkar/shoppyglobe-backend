/**
 * Cart Routes
 * Handles shopping cart operations
 */
const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeCartItem,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { cartItemRules, validate } = require('../middleware/validation');

// All cart routes are protected
router.use(protect);

router.get('/', getCart);
router.post('/', cartItemRules, validate, addToCart);
router.put('/:itemId', updateCartItem);
router.delete('/:itemId', removeCartItem);
router.delete('/', clearCart);

module.exports = router;