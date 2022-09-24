const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();
// const config = require('config');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);


const addOrderItems = async(req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;



    try {
        if (orderItems && orderItems.length === 0) {
            return res.status(400).send('no order items');
        } else {
            const order = new Order({
                orderItems: req.body.orderItems.map((x) => ({...x, Product: x._id })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })

            const createdOrder = await order.save();

            res.status(200).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error });

    }
}


const getOrderById = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.status(200).json(order);
        }
    } catch {
        res.status(400).send('invalid error');

    }

}



const Checkout = async(req, res) => {
    try {
        const userId = req.params.id;
        const { source, shippingAddress, paymentMethod, itemsPrice, totalPrice } = req.body;
        let cart = await Cart.findOne({ userId });
        let user = await User.findOne({ _id: userId });
        const email = user.email;
        if (cart) {
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'usd',
                source: source,
                receipt_email: email,
            });
            if (!charge) {
                return res.send('invalid');
            } else {
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                });
                const data = await Cart.findByIdAndDelete({ _id: cart.id })
                return res.status(201).send(order);
            }
        } else {
            res.status(500).send('you do not have items in cart')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong');
    }
}


const updateOrderToPaid = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            }


            const updatedOrder = await order.save()

            res.json(updatedOrder);
        }
    } catch {
        res.status(400).send('no update order');

    }
}


const updateOrderToBeDelivered = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.isDelivered = true
            order.deliveredAt = Date.now()

            const updatedOrder = await order.save()

            res.json(updatedOrder)
        }
    } catch {
        res.status(400).send('cannot deliver order');

    }
}


const getMyOrders = async(req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ Date: -1 })
    res.json(orders);
}



module.exports = {
    getMyOrders,
    updateOrderToBeDelivered,
    updateOrderToPaid,
    getOrderById,
    addOrderItems
}