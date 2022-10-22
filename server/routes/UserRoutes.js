const express = require('express');
const routes = express.Router();
const userContoller = require('../controllers/User');
const orderController = require('../controllers/order');
const {verifyToken,verifyTokenAuthorization,verifyTokenAndAdmin}=require('../middleware/auth');



routes.post('/user/register', userContoller.registerUser);
routes.post('/user/login', userContoller.userLogin);
routes.put('/user/profile', verifyTokenAuthorization, userContoller.getUserProfile);
routes.post('/user/home', verifyToken, orderController.addOrderItems);
routes.put('/user/updateadmin',userContoller.update);
routes.get('/user/refreshtoken',userContoller.refreshTokenNow);
routes.get('/user/logout',userContoller.handleLogout);

routes.get('/home', verifyToken, (req, res) => {
   return res.status(200).json({ message: 'Welcome To Dawn' });
})


module.exports = routes;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmNTBlZTY3OTcxMGY3ZmQ4MjgwNmQiLCJlbWFpbCI6Im9rb25kYW5pZWxAZ21haWwuY29tIiwiaWF0IjoxNjU0NjA4MTEwLCJleHAiOjE2NTQ2MTUzMTB9.aPtIu3fLlqpITnDZB-8Zfro3VA96nSsNnIJDoiS0iAU