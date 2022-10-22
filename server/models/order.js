const mongoose = require('mongoose');

const orderSchema =new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    customerId:{
        type:String,
    },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: [1, 'quantity can not be less than one'], default: 1 },
        partimage: { type: String },
        price: { type: Number, required: true },
        productId: {
            type: String,
            ref: 'Product',
            select:'+parts'
        },
    }, ],
    shipping: {
        type: Object,
        required: true,
    },
   
    payment_status: {
        type: String,
        required: true
    },
    taxPrice: {
        type: Number,
        
        default: 0.0,
    },
    bill: {
        type: Number,
        required: true,
        default: 0
    },
    
    total: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
        default: Date.now(),
    },
    date_added: {
        type: Date,
        default: Date.now(),
    }
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema);

module.exports =  Order ;