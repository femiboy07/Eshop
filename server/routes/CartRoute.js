const express = require('express');
const routes = express.Router();
const cartRoute = require('../controllers/Cart');
const {verifyToken,verifyTokenAuthorization,verifyTokenAndAdmin}= require('../middleware/auth');


// routes.get('/cart',verifyToken,)
routes.get('/cart/:id',verifyToken, cartRoute.getCartItems);
routes.post('/cart/:id',verifyToken, cartRoute.addCartItem);
routes.put('/cart/:id',verifyToken, cartRoute.updateCartItem);
routes.delete('/cart/:userId/:itemId',verifyToken, cartRoute.deleteItem);


module.exports = routes;