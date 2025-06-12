/**
 * Cart Controller
 * Handles shopping cart operations
 */
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

/**
 * Get user cart
 * @route   GET /api/cart
 * @access  Private
 */
exports.getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });

  // If no cart exists, create an empty one
  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [],
      totalQuantity: 0,
      totalAmount: 0
    });
  }

  res.json({
    success: true,
    cart
  });
});

/**
 * Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Validate product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if product is in stock
  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Product is out of stock');
  }

  // Find user's cart or create new one
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = new Cart({
      user: req.user.id,
      items: [],
      totalQuantity: 0,
      totalAmount: 0
    });
  }

  // Check if product already in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.productId.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update existing item
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].totalPrice = 
      cart.items[existingItemIndex].price * cart.items[existingItemIndex].quantity;
  } else {
    // Add new item
    cart.items.push({
      productId,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity,
      totalPrice: product.price * quantity
    });
  }

  // Save cart (totals are calculated in pre-save hook)
  await cart.save();

  res.status(200).json({
    success: true,
    cart
  });
});

/**
 * Update cart item quantity
 * @route   PUT /api/cart/:itemId
 * @access  Private
 */
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  // Validate quantity
  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  // Find user's cart
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find the item
  const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Check product stock
  const product = await Product.findById(cart.items[itemIndex].productId);
  if (!product) {
    res.status(404);
    throw new Error('Product no longer exists');
  }

  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }

  // Update item quantity and total price
  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].totalPrice = cart.items[itemIndex].price * quantity;

  // Save cart
  await cart.save();

  res.json({
    success: true,
    cart
  });
});

/**
 * Remove item from cart
 * @route   DELETE /api/cart/:itemId
 * @access  Private
 */
exports.removeCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  // Find user's cart
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Remove the item
  cart.items = cart.items.filter(item => item._id.toString() !== itemId);

  // Save cart
  await cart.save();

  res.json({
    success: true,
    cart
  });
});

/**
 * Clear cart
 * @route   DELETE /api/cart
 * @access  Private
 */
exports.clearCart = asyncHandler(async (req, res) => {
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Clear items
  cart.items = [];
  
  // Save cart
  await cart.save();

  res.json({
    success: true,
    message: 'Cart cleared',
    cart
  });
});