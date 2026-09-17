const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
    },
    
    price: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true
    },
    availableQuantity: {
      type: Number,
      required: true
    },
    
    location: {
      state: String,
      city: String,
      address: String
    },
    harvestDate: {
      type: Date
    },
    expiryDate: {
      type: Date
    },
   
    isAvailable: {
      type: Boolean,
      default: true
    },
    
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product; 