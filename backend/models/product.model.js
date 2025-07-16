const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: 'Apple',
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number, // Percentage or absolute value
  },
  colorOptions: [
    {
      name: String, // e.g., "Natural Titanium"
      hexCode: String, // Optional
    }
  ],
  selectedColor: {
    type: String,
  },
  images: [String], // URLs or file paths
  rating: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  exchangeOffer: {
    maxDiscount: Number,
    isAvailable: Boolean,
  },
  emiOption: {
    monthly: Number,
    duration: String, // e.g., "24 months"
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
