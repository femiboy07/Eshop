require('dotenv').config();
const Stripe = require('stripe').Stripe(process.env.STRIPE_API_KEY);
const Cart = require('../models/cart');
const stripe = Stripe
const Order=require('../models/order');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { request } = require('express');
const Product = require('../models/Product');
const { events } = require('../models/Product');


const checkoutSession =async(req, res) => {
 const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            carts: JSON.stringify(req.body.cartItems),
        },
    })

  const carts=req.body.cartItems;
    const line_items = carts.map(item => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images:item.image,
                    metadata: {
                        id: item._id,
                        partimage:item.partimage

                    },
                },
                
                unit_amount: item.price * 100,
            },
            adjustable_quantity: {
                enabled: true,
                minimum: 1,
                maximum: 10
              },
             
            quantity: item.quantity,
        }
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        shipping_address_collection: {
            allowed_countries: ["US", "NG"],
        },
        shipping_options: [{
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: 'usd',
                    },
                    display_name: "Free Shipping",
                    delivery_estimate: {

                        minimum: {
                            unit: 'business_day',
                            value: 5
                        },

                        maximum: {
                            unit: 'business_day',
                            value: 7
                        },

                    }
                }
            },

            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1500,
                        currency: "usd",
                    },
                    display_name: "Next day air",
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 1,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 1,
                        },
                    }
                }
            }

        ],
        phone_number_collection: {
            enabled: true,
        },
        line_items: line_items,
        mode: 'payment',
        customer: customer.id,
        success_url: `http://localhost:3000/checkout-success`,
        cancel_url: `http://localhost:3000/cart`,

    });
    res.send({ url: session.url })


}


const createOrder = async(customer, data) => {
    const items = JSON.parse(customer.metadata.carts);

    const products = items.map((item) => {
        return {
            productId: item._id,
            quantity: item.quantity,
            name: item.name,
            partimage: item.partimage,
            color:item.color
        }
    })
    const newOrder =new Order ({
        userId: customer.metadata.userId,
        customerId: data.customer,
        items:products,
        bill: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    })
   

    try {
        const saveOrder = await newOrder.save();
        console.log('processed order', newOrder);
        return res.status(200).json(saveOrder)
    } catch (err) {
        console.log(err)
    }

}
const endpointSecret = "whsec_01a9a73f93d7dfa247d1cabd3df1c9f205ad3f37e21cf4e2f25389a5d07635f6";
const webhooks =expressAsyncHandler((req, res) => {
    // let data;
    // let eventType;

    // Check if webhook signing is configured.
    // let endpointSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;
    let signature = req.headers["stripe-signature"];
    
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        const payload=req.body;
        
        try {
            event = stripe.webhooks.constructEvent(payload,signature,endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed:  ${err}`);
            return res.sendStatus(400).send('invalid cant continue');
        }
        let data=event.data.object;
          switch(event.type){
            case "checkout.session.completed":
            stripe.customers.retrieve(data.id).then((customer)=>{
                
                //  createOrder(customer, data);
                 console.log(customer)
                 
                 console.log("data",data);
                    
                
            }).catch((err) => console.log(err.message));
    }

    res.status(200).send('response succesfull');
})



module.exports = { checkoutSession, webhooks };