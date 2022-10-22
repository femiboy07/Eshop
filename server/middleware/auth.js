const jwt = require('jsonwebtoken');
const User = require('../models/User');




const verifyToken = async(req, res, next) => {
    


    // if (req.headers['authorization'] && req.headers['authorization'].startsWith("Bearer")) {
    //     token = req.headers.authorization.split('')[1];
    // }
    const authHeader = req.headers['authorization'];
    // const token = req.body.token || req.query.token || req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
    if(token) {
        
    jwt.verify(token, process.env.TOKEN_KEY,(err,user)=>{
            if (err) return res.status(403).json("Token is not valid!");
            req.user = user;
            //  res.status(200).send(user)
            next();
        
        });
    // }else{
    //     return res.status(401).json("You are not authenticated!");
    // }
    }
}


    







const verifyTokenAuthorization=async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
           return next();
        }else{
            res.status(403).send('you are not allowed to do that');
        }
    })

}


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
       return next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };



module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAuthorization
};