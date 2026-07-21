const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending"
    },
    deliveryAddress: {
      state: String,
      city: String,
      address: String,
      pincode: String
    },
    deliveryDate: {
      type: Date
    },
    deliveryMethod: {
      type: String,
      enum: ["pickup", "delivery"],
      default: "pickup"
    },
    notes: {
      type: String
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: {
      type: String
    },
    trackingNumber: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order; 