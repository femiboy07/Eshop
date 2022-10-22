const bodyParser = require('body-parser');
const express = require('express');
const routes = express.Router();
const stripeRoute = require('../controllers/Stripe');
// let endpointSecret;
const endpointSecret = "whsec_01a9a73f93d7dfa247d1cabd3df1c9f205ad3f37e21cf4e2f25389a5d07635f6";

routes.post('/stripe/create-checkout-session',bodyParser.raw({type:'application/json'}), stripeRoute.checkoutSession);
routes.post('/webhook',bodyParser.raw({type:'application/json'}), stripeRoute.webhooks);


module.exports = routes;