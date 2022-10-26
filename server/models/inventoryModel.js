const mongoose = require("mongoose");
// const { PIZZA_BASE, PIZZA_SAUCE, PIZZA_CHEESE } = require("../constants/constants");

const inventorySchema = mongoose.Schema(
  {
    base: [
      {
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    sauce: [
      {
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    cheese: [
      {
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);