const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    items: [{
        productId: {
            type: String,
            ref: "Product",
            select:'+parts'
            
        },
       name: String,
       partimage: String,
       color:{
        type:String,
        required:true
       },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 0
        },
        price: {
            type:Number,
            required:true
        }

    
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});


const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;