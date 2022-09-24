const express = require('express');
const routes = express.Router();
const stripeRoute = require('../controllers/Stripe');


routes.post('/stripe/create-checkout-session', stripeRoute.checkoutSession);
routes.get('/webhooks', stripeRoute.webhooks);


module.exports = routes;