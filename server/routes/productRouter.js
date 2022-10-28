const express = require("express");

const router = express.Router();

const Product = require("../models/productModel");
const Inventory = require("../models/inventoryModel");
const { CUSTOM_PRODUCT_ID } = require("../constants");

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/custom", async (req, res) => {
  try {
    const products = await Product.find({ _id: CUSTOM_PRODUCT_ID });
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const inventory = await Inventory.find({});
    // console.log(inventory);

    return res.status(200).json({ status: "ok", inventory });
  } catch (err) {
    res.status(500).json({ status: "error", error: err });
  }
});

router.post("/add-inventory", async (req, res) => {
  try {
    console.log(req.body);
    const inventory = await Inventory.create({
      ...req.body,
    });

    return res.status(200).send({ status: "ok" });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

module.exports = router;
