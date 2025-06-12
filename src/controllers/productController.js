/**
 * Product Controller
 * Handles product management operations
 */
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

/**
 * Get all products
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = asyncHandler(async (req, res) => {
  // Build query with filters
  let query = {};
  
  // Category filter
  if (req.query.category) {
    query.category = req.query.category;
  }
  
  // Price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
  }
  
  // In stock filter
  if (req.query.inStock === 'true') {
    query.stock = { $gt: 0 };
  }

  // Search term
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 30;
  const startIndex = (page - 1) * limit;
  
  const products = await Product.find(query)
    .skip(startIndex)
    .limit(limit);
  
  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    count: products.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    products
  });
});

/**
 * Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({
    success: true,
    product
  });
});

/**
 * Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = asyncHandler(async (req, res) => {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to create products');
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
});

/**
 * Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = asyncHandler(async (req, res) => {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update products');
  }

  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Update product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json({
    success: true,
    product
  });
});

/**
 * Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete products');
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: 'Product removed'
  });
});

/**
 * Search products
 * @route   GET /api/products/search
 * @access  Public
 */
exports.searchProducts = asyncHandler(async (req, res) => {
  const { term } = req.query;
  
  if (!term) {
    res.status(400);
    throw new Error('Please provide a search term');
  }

  // Search using text index
  const products = await Product.find(
    { $text: { $search: term } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  res.json({
    success: true,
    count: products.length,
    products
  });
});