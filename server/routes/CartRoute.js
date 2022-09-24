const express = require('express');
const routes = express.Router();
const cartRoute = require('../controllers/Cart');
const auth = require('../middleware/auth');



routes.get('/cart/:id', cartRoute.getCartItems);
routes.post('/cart/:id', cartRoute.addCartItem);
routes.put('/cart/:id', cartRoute.updateCartItem);
routes.delete('/cart/:userId/:itemId', cartRoute.deleteItem);

module.exports = routes;