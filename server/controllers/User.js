const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const Product = require('../models/Product');
const expressasynchandler = require('express-async-handler');



const registerUser = async(req, res, ) => {

    const { name, email, password } = req.body;

    try {




        if (!(name && email && password)) {
            res.status(400).send('All input is required');
        }

        const oldUser = await User.findOne({ email }).select('+password');
        if (oldUser) {
            res.status(409).json({ success: false, error: 'invalid credentials' });
        } else {

            const UserRegister = await User.create({
                name,
                email,
                password
            })




            //create token

            const token = jwt.sign({ _id: UserRegister._id, email }, process.env.TOKEN_KEY, {
                expiresIn: '2h',

            })

            UserRegister.token = token;



            res.status(201).json({
                success: true,
                UserRegister

            });
        }


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })


    }

}

const userLogin = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send('All input is required');

        } else {
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                res.status(401).send('you dont have an account with us');
            }

            const isMatch = await user.matchPassWord(password);
            if (isMatch) {
                const token = jwt.sign({ _id: user._id, email, password }, process.env.TOKEN_KEY, {
                    expiresIn: '2h',
                })
                user.token = token;

                res.status(200).send(user);
            } else {

                res.status(400).send('invalid credentials');
            }
        }
    } catch (err) {
        console.log(err);
    }
}



const getUserProfile = expressasynchandler(async(req, res) => {

    const user = await User.findOne({ _id: id });


    if (user) {
        user = JSON.parse(
            JSON.stringify(user)
            .split('"_id":')
            .join('"id":')
        )
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.body.password) {
            user.password = bycrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await user.save();
        res.send({

            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: jwt.sign({ _id: updatedUser._id, email, }, process.env.TOKEN_KEY, {
                expiresIn: '2h',
            }),
        });
    } else {
        res.status(404).send({ message: 'User not found' });
    }
})












module.exports = { registerUser, userLogin, getUserProfile };