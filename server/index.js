// import modules needed
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // for getting req.body != undefined;
// const session = require('session');
require('dotenv').config();
const mongoose = require('mongoose');
const Route = require('./routes/AdminRoutes');
const userRoute = require('./routes/UserRoutes');
const productRoute = require('./routes/ProductRoutes');
const stripeRoute = require('./routes/StripeRoute');
const cartRoute = require('./routes/CartRoute');
const cookieparser=require('cookie-parser');
const auth = require('./middleware/auth');
const path=require('path');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOption');



//invoke expresss here
const app = express();

// //use modules
app.use(credentials);
// const corsConfig={
//     origin:true,
//     credentials:true
// }
app.use(cors(corsOptions));
// app.use(bodyParser.raw({type:'*/*'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cookieparser())



// app.use(session);

const PORT = 5000;
console.log(process.env.DB_CONFIG);
console.log(process.env.STRIPE_API_KEY)



mongoose.connect(process.env.DB_CONFIG, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`server listens on ${PORT} `);

    });
}).catch((err) => {
    console.log('cant connect to database', err);
})

setTimeout(() => {
    //admin route
    app.use('/api', Route);
    //user route
    app.use('/api', userRoute);
    app.use('/api', cartRoute);

    //product route
    app.use('/api', productRoute);

    app.use('/api', stripeRoute);



    // home request
}, 200)