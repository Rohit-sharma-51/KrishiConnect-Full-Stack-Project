const mongoose = require("mongoose");

const marketDataSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    minPrice: {
      type: Number,
      required: true
    },
    maxPrice: {
      type: Number,
      required: true
    },
    avgPrice: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    demand: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    supply: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    trend: {
      type: String,
      enum: ["increasing", "decreasing", "stable"],
      default: "stable"
    },
    source: {
      type: String,
      default: "market"
    }
  },
  {
    timestamps: true
  }
);

const MarketData = mongoose.model("MarketData", marketDataSchema);

module.exports = MarketData; 