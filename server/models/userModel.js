const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const HistorySchema = new mongoose.Schema({
    amount: {
        type: Number,
    },
    transactionType: {
        type: String,
    },
    receiver: {
        type: String,
    },
    date: {
        type: String,
    },
    senderCurrency: {
        type: String,
    },
    receiverCurrency: { // fixed typo
        type: String
    },
    receiverCountry: {
        type: String
    },
    senderCountry: {
        type: String
    }
});

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: ["farmer", "buyer"],
        required: true
    },
    language: {
        type: String,
        enum: ["english", "hindi"],
        default: "english"
    },
    amount: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    country: {
        type: String,
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    profileImage: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    history: [HistorySchema]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;