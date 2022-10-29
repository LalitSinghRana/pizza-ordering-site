const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    base: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Inventory",
    },
    sauce: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Inventory",
    },
    cheese: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Inventory",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
