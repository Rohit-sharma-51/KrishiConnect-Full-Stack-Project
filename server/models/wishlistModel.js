const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  contactRequested: {
    type: Boolean,
    default: false
  },
  contactRequestDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Ensure unique buyer-product combinations
wishlistSchema.index({ buyer: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema); 