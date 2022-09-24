const Product = require('../models/Product');
const Cart = require('../models/cart');




const getCartItems = async(req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart && cart.items.length > 0) {
            res.send(cart);
        } else {
            res.send(null)
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('something went wrong')
    }
}


const addCartItem = async(req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;
    const quantity = req.body.quantity;

    // userId = JSON.parse(JSON.stringify(userId).split('"_id":').join('"id":'))
    try {
        let cart = await Cart.findOne({ userId });
        let item = await Product.findOne({ _id: productId });

        if (!item) {
            return res.status(404).json({ message: 'item not found' })
        }
        const price = item.price;
        const name = item.name;
        const image = item.image;
        const countInStock = item.countInStock;

        if (cart) {
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                cart.items.push({ productId, name, quantity, price, image, countInStock });
            }
            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, quantity, price, image, countInStock }],
                bill: quantity * price
            });

            res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}


const updateCartItem = async(req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;
    const qty = req.body.qty;
    try {
        let cart = await Cart.findOne({ userId });
        let item = await Product.findOne({ _id: productId });

        if (!item)
            return res.status(404).send('Item not found!'); // not returning will continue further execution of code.

        if (!cart)
            return res.status(400).send("Cart not found");
        else {
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if (itemIndex === -1)
                return res.status(404).send('Item not found in cart!');
            else {
                let productItem = cart.items[itemIndex];
                productItem.quantity = qty;
                cart.items[itemIndex] = productItem;
            }
            cart.bill = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cart = await cart.save();
            return res.status(201).send(cart);
        }
    } catch (err) {
        // just printing the error wont help us find where is the error. Add some understandable string to it.
        console.log("Error in update cart", err);
        res.status(500).send("Something went wrong");
    }
}



const deleteItem = async(req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    try {
        let cart = await Cart.findOne({ userId });
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity * productItem.price;
            cart.items.splice(itemIndex, 1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports = { deleteItem, addCartItem, updateCartItem, getCartItems }