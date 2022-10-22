const express = require('express');
const routes = express.Router();
const productRoute = require('../controllers/Product');
const {verifyToken} = require('../middleware/auth');



routes.get('/admin/products', productRoute.readAllProduct);
routes.get('/admin/products/:id', productRoute.readProduct);
routes.get('/admin/products/:reviews',productRoute.getReviews);
routes.get('/products/category', productRoute.getProductCategories);
routes.get('/products/search', productRoute.searchProducts);
routes.get('/users/products', productRoute.userlistAllProduct);
routes.get('/products', productRoute.readAllProducts);
routes.get('/search/:key',productRoute.searchMultipleFields)
routes.post('/products/:id/reviews',verifyToken, productRoute.createProductReview);



module.exports = routes;