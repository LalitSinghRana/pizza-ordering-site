const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
      unique: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 3600,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Token", tokenSchema);
