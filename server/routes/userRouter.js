const express = require('express')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Inventory = require('../models/inventoryModel')
const jwt = require('jsonwebtoken');
const { ORDER_STATUS, JWT_SECRET_KEY } = require('../constants');

const router = express.Router()

const genereateToken = (user) => {
    // console.log(user);
    return jwt.sign({
        _id: user._id,
        isAdmin: user.isAdmin
    }, JWT_SECRET_KEY);
};

const verifyAndDecodeToken = (token) => {
    // console.log(token);
    return jwt.verify(token, JWT_SECRET_KEY);
}

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create({
            ...req.body
        });

        const token = genereateToken(user);
        res.status(200).send({ status: "ok", token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ ...req.body });

        if (!user) throw new Error('User not found');
        console.log(user);

        const token = genereateToken(user);
        return res.status(200).send({ status: "ok", token });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/place-order', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedToken = verifyAndDecodeToken(token);
        const userId = decodedToken._id;

        if (!userId) throw new Error('Invalid token');

        const orderItems = req.body.orderItems.map(element => {
            return {
                amount: element.amount,
                price: element.price,
                productId: element._id
            }
        });

        const order = await Order.create({
            userId,
            orderItems,
            shippingAddress: req.body.shippingAddress,
            orderStatus: ORDER_STATUS.ORDER_RECEIVED
        });

        if (!order) throw new Error('Failed to create order');

        return res.status(200).send({ status: "ok", order });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/admin/orders', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decodedToken = verifyAndDecodeToken(token);
        const _id = decodedToken._id;

        if (!_id || !decodedToken.isAdmin) throw new Error('Invalid token');

        const orders = await Order.find({ orderStatus: { $ne: ORDER_STATUS.DELIVERED } });

        return res.status(200).json({ status: "ok", orders });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err });
    }
});

router.post('/admin/update-order-status', async (req, res) => {
    try {
        const order = req.body.order
        console.log("order :", order);

        const token = req.headers['x-access-token'];
        const decodedToken = verifyAndDecodeToken(token);
        const _id = decodedToken._id;

        if (!_id || !decodedToken.isAdmin) throw new Error('Invalid token');

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

        console.log(nextStatus);

        const updateResult = await Order.updateOne({ _id: order._id }, {
            $set: {
                orderStatus: nextStatus
            }
        });

        console.log(updateResult);

        return res.status(200).json({ status: "ok", updateResult });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err });
    }
});

router.get('/inventory', async (req, res) => {
    try {
        // const token = req.headers['x-access-token'];
        // const decodedToken = verifyAndDecodeToken(token);
        // const _id = decodedToken._id;

        // if (!_id || !decodedToken.isAdmin) throw new Error('Invalid token');

        const inventory = await Inventory.find({});
        console.log(inventory);

        return res.status(200).json({ status: "ok", inventory });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err });
    }
});

module.exports = router