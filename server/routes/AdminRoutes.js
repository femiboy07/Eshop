const express = require('express');
const routes = express.Router();
const adminRoute = require('../controllers/Admin');
const upload=require('../common');
const Product=require('../models/Product');




routes.get('/admin/users', adminRoute.getAdminUsers);
// routes.get('/admin/products/:id', adminRoute.readProduct);
routes.get('/admin/users/:id', adminRoute.getIndividualUser);
routes.post('/admin/productpart/:id',upload.single('part'),adminRoute.createProductParts);
routes.post('/admin/product',upload.array('image'),adminRoute.createProducts);

routes.put('/admin/product/:id', adminRoute.updateProduct);
routes.delete('/admin/product/:id', adminRoute.deleteProduct);
routes.get('/admin/search', adminRoute.queryUsers);
routes.put('/admin/users/:id', adminRoute.updateUser);
routes.delete('/admin/users/:id', adminRoute.deleteUser);


module.exports = routes;