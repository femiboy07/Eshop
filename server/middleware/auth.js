const jwt = require('jsonwebtoken');
const User = require('../models/User');




const verifyToken = async(req, res, next) => {
    let token;


    // if (req.headers['authorization'] && req.headers['authorization'].startsWith("Bearer")) {
    //     token = req.headers.authorization.split('')[1];
    // }
    // const token = req.body.token || req.query.token || req.headers.authorization;
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'token required' });
    }
    try {
        const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);


        const user = await User.findById(verifyToken.id);

        // if (!user) {
        //     res.status(400).send('invalid credentials');
        // }

        req.user = user;

        res.send(user);


    } catch (err) {
        res.status(500).json({ message: 'token is no valid again' });

    }
    return next();




}



module.exports = verifyToken;