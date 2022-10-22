const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const Product = require('../models/Product');
const expressasynchandler = require('express-async-handler');



const registerUser = async(req, res ) => {

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
                expiresIn: '60s',

            })
            const refreshToken=jwt.sign({_id:UserRegister._id,email,password,isAdmin:UserRegister.isAdmin},process.env.REFRESH_TOKEN,{
                expiresIn:'2h'
            })
            UserRegister.token = token;
            UserRegister.refreshToken=refreshToken;


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

const userLogin = async(req, res) => {
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
                const token = jwt.sign({ _id: user._id, email,isAdmin:user.isAdmin ,name:user.name}, process.env.TOKEN_KEY, {
                    expiresIn: '2h',
                })
                const refreshToken=jwt.sign({_id:user._id,email,isAdmin:user.isAdmin},process.env.REFRESH_TOKEN,{
                    expiresIn:'60s'
                })
                user.token = token;
                res.cookie('access_token',refreshToken, {httpOnly:true,maxAge:24*60*60*1000,SameSite:'None',secure:true})
                 res.status(200).send(user);
            }else{
             res.status(400).send('invalid credentials');
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const refreshTokenNow=async(req,res)=>{
    const cookies=req.cookies['access_token'];
     if(!cookies){
        return res.status(400).json({
            message:'no refresh token'
        })
      }
        const refreshToken=cookies;
        const userfound=await User.findOne(refreshToken._id).exec();
        if(!userfound) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,function(err,user){
        if(err){
          return  res.status(400).json({message:err.message})
        }else{
        const token = jwt.sign({ _id: user._id,isAdmin:user.isAdmin,email:user.email }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
       })
    
       user.token=token;
  
    res.status(201).send(user)
    }
  });

}

const handleLogout=async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.access_token){
        return res.status(204).send('no content');//No content;
    }
    const refreshToken=cookies.access_token;
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('access_token', { httpOnly: true, sameSite: 'None',secure:true });
        return res.sendStatus(204);
    }
    //delete refresh token in db
    user.refreshToken = '';
    const result = await user.save();
    console.log(result);

    res.clearCookie('access_token', { httpOnly: true, sameSite: 'None',secure:true });
    res.sendStatus(204);
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

const update=async(req,res)=>{
    const {isAdmin,id}=req.body;
    try{
         if(!(isAdmin && id)){
            return res.status(400).send('both values needed');
         }
         if(isAdmin === true){
            await User.findById(id).then((user)=>{
                if(user.isAdmin !== true){
                    user.isAdmin=true;
                    user.save((err)=>{
                        if(err){
                            res.status(400).json({message:'an error occured',error:err.message})
                        }
                        res.status(201).json({message:"update successful",user});
                    })
                }else{
                    res.status(400).json({ message: "User is already an Admin" });
                }
            }).catch((err)=>{
                res
                .status(400)
                .json({ message: "An error occurred", error: err.message });
            })

         }
    }catch(err){
        console.log(err);

    }
}












module.exports = { registerUser, userLogin, getUserProfile ,update,refreshTokenNow,handleLogout};