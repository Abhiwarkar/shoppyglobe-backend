/**
 * Helper Utility Functions
 * Provides reusable functions for the application
 */

/**
 * Format price with currency symbol
 * @param {Number} price - Price value
 * @param {String} currency - Currency code (default: USD)
 * @returns {String} Formatted price
 */
exports.formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price);
};

/**
 * Generate pagination links
 * @param {Number} page - Current page
 * @param {Number} totalPages - Total number of pages
 * @param {String} baseUrl - Base URL for links
 * @param {Object} query - Query parameters
 * @returns {Object} Pagination links
 */
exports.getPaginationLinks = (page, totalPages, baseUrl, query = {}) => {
  const links = {};
  const queryString = Object.entries(query)
    .filter(([key]) => key !== 'page')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Previous page link
  if (page > 1) {
    links.prev = `${baseUrl}?page=${page - 1}${queryString ? `&${queryString}` : ''}`;
  }

  // Next page link
  if (page < totalPages) {
    links.next = `${baseUrl}?page=${page + 1}${queryString ? `&${queryString}` : ''}`;
  }

  return links;
};

/**
 * Check if a string is a valid MongoDB ObjectID
 * @param {String} id - ID to check
 * @returns {Boolean} True if valid ObjectID
 */
exports.isValidObjectId = (id) => {
  const ObjectId = require('mongoose').Types.ObjectId;
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
};

/**
 * Sanitize user input to prevent XSS
 * @param {String} text - Text to sanitize
 * @returns {String} Sanitized text
 */
exports.sanitizeInput = (text) => {
  if (!text) return text;
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};