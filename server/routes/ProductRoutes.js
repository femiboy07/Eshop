const express = require('express');
const routes = express.Router();
const productRoute = require('../controllers/Product');
const auth = require('../middleware/auth');



routes.get('/admin/products', productRoute.readAllProduct);
routes.get('/product/:id', productRoute.readProduct);
routes.get('/products/category', productRoute.getProductCategories);
routes.get('/products/search', productRoute.searchProducts);
routes.get('/users/products', productRoute.userlistAllProduct);
routes.get('/products', productRoute.readAllProducts);
routes.post('/products/:id/reviews', auth, productRoute.createProductReview);



module.exports = routes;