/**
 * Database connection configuration
 * Establishes connection to MongoDB using Mongoose
 */
const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses environment variables for connection string
 */
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDatabase };