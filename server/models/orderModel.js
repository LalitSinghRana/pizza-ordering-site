const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    orderItems: [
      {
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: false },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    orderStatus: { type: String, required: true },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Order", orderSchema);
