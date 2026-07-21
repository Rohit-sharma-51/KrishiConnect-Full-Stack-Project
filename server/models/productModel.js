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
      enum: ["grains", "vegetables", "fruits", "dairy", "poultry", "other"]
    },
    subCategory: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "quintal", "ton", "dozen", "piece", "litre"]
    },
    quantity: {
      type: Number,
      required: true
    },
    availableQuantity: {
      type: Number,
      required: true
    },
    images: [{
      type: String
    }],
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
    isOrganic: {
      type: Boolean,
      default: false
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    rating: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    tags: [String]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product; 