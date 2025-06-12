/**
 * Product Model
 * Defines schema for product data aligned with frontend requirements
 */
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a product title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a product price'],
    min: [0, 'Price must be a positive number']
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: [0, 'Discount percentage must be between 0 and 100'],
    max: [99, 'Discount percentage must be between 0 and 100']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'electronics', 
      'clothing', 
      'furniture', 
      'groceries', 
      'toys', 
      'sports', 
      'beauty', 
      'health', 
      'automotive', 
      'home',
      'smartphones',
      'laptops',
      'fragrances',
      'skincare',
      'home-decoration'
    ]
  },
  thumbnail: {
    type: String,
    required: [true, 'Please add a thumbnail image URL']
  },
  images: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for text search
ProductSchema.index({ 
  title: 'text', 
  description: 'text',
  brand: 'text',
  category: 'text'
});

module.exports = mongoose.model('Product', ProductSchema);