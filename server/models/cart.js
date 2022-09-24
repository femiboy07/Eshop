const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User'
    },
    items: [{
        productId: {
            type: String,
            ref: "Product"
        },
        name: String,
        image: String,
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },

        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },


        price: Number
    }],

    bill: {
        type: Number,
        required: true,
        default: 0
    }
});


const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;