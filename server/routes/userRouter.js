const express = require("express");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { ORDER_STATUS } = require("../constants");
const { encrypt } = require("../util/custom-crypto");
const {
  generateVerificationToken,
  updateInventory,
  checkInventory,
  genereateToken,
  verifyAndDecodeToken,
} = require("../util/helper-functions");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);

    const user = await User.create({
      ...req.body,
      password: encrypt(req.body.password),
    });

    console.log(user);
    await generateVerificationToken(user);

    res.status(200).send({ status: "ok", message: "Please, check you email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);

    const user = await User.findOne({
      ...req.body,
      password: encrypt(req.body.password),
    });

    if (!user) throw new Error("User not found");
    console.log(user);
    if (!user.verified) throw new Error("User not verified");

    const token = genereateToken(user);
    return res.status(200).send({ status: "ok", token });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.post("/place-order", async (req, res) => {
  try {
    // console.log("req.body :", req.body);

    const token = req.headers["x-access-token"];
    const decodedToken = verifyAndDecodeToken(token);
    const userId = decodedToken._id;

    if (!userId) throw new Error("Invalid token");

    const orderItems = req.body.orderItems.map((element) => {
      return {
        amount: element.amount,
        price: element.price,
        productId: element._id,
      };
    });

    const order = await Order.create({
      userId,
      orderItems,
      shippingAddress: req.body.shippingAddress,
      orderStatus: ORDER_STATUS.ORDER_RECEIVED,
    });

    if (!order) throw new Error("Failed to create order");

    req.body.orderItems.forEach((item) => {
      let amt = item.amount;
      while (amt--) updateInventory(item.base, item.sauce, item.cheese);
    });

    checkInventory();

    return res.status(200).send({ status: "ok", order });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ status: "error", error });
  }
});

router.get("/admin/orders", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decodedToken = verifyAndDecodeToken(token);
    const _id = decodedToken._id;

    if (!_id || !decodedToken.isAdmin) throw new Error("Invalid token");

    const orders = await Order.find({
      orderStatus: { $ne: ORDER_STATUS.DELIVERED },
    });

    return res.status(200).json({ status: "ok", orders });
  } catch (err) {
    res.status(500).json({ status: "error", error: err });
  }
});

router.post("/admin/update-order-status", async (req, res) => {
  try {
    const order = req.body.order;

    const token = req.headers["x-access-token"];
    const decodedToken = verifyAndDecodeToken(token);
    const _id = decodedToken._id;

    if (!_id || !decodedToken.isAdmin) throw new Error("Invalid token");

    let nextStatus;
    switch (order.orderStatus) {
      case ORDER_STATUS.ORDER_RECEIVED:
        nextStatus = ORDER_STATUS.IN_THE_KITCHEN;
        break;
      case ORDER_STATUS.IN_THE_KITCHEN:
        nextStatus = ORDER_STATUS.SENT_TO_DELIVERY;
        break;
      case ORDER_STATUS.SENT_TO_DELIVERY:
        nextStatus = ORDER_STATUS.DELIVERED;
        break;
      default:
        break;
    }

    const updateResult = await Order.updateOne(
      { _id: order._id },
      {
        $set: {
          orderStatus: nextStatus,
        },
      }
    );
    return res.status(200).json({ status: "ok", updateResult });
  } catch (err) {
    res.status(500).json({ status: "error", error: err });
  }
});

router.get("/:userId/verify/:token", async (req, res) => {
  try {
    // console.log(req.params);

    const user = await User.findById(req.params.userId);
    if (!user) throw new Error("User not found");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) throw new Error("Invalid token");

    await User.updateOne({ _id: user._id }, { verified: true });
    await token.remove();

    console.log("user verified successfully");

    res.status(200).send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error });
  }
});

module.exports = router;
