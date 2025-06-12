// src/utils/seeder.js
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const importData = async () => {
  try {
    console.log('Fetching products from DummyJSON API...');
    
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    
    await Product.deleteMany();
    console.log('Cleared existing products');
    
    const formattedProducts = data.products.map(product => ({
      title: product.title || 'Untitled Product',
      description: product.description || 'No description available',
      price: product.price || 0,
      discountPercentage: product.discountPercentage || 0,
      rating: product.rating || 0,
      stock: product.stock || 0,
      brand: product.brand || 'Generic Brand',  // Add default brand
      category: product.category || 'uncategorized',
      thumbnail: product.thumbnail || 'https://via.placeholder.com/150',
      images: product.images || []
    }));
    
    // Debug what's being sent to MongoDB
    console.log(`Preparing to import ${formattedProducts.length} products`);
    
    // Import products
    await Product.insertMany(formattedProducts);
    
    console.log(`${formattedProducts.length} products imported successfully`);
    process.exit(0);
  } catch (error) {
    console.error(`Error details:`, error);
    process.exit(1);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Products deleted successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Run based on command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}