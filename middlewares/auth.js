const jwt = require("jsonwebtoken");
const User = require("../models/user.js");


exports.requireSignin=(req,res,next)=>{

  try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
        );

        req.user = decoded;
        next();
        // console.log(user);
  } catch (err) {
    console.log(err);
  }
}

exports.isAdmin= async (req,res,next)=>{
    try {
        const user =await User.findById(req.user._id);
        console.log(user);
        if(user.role!=1){
            return res.json({err:"Unautorised"});
        }else{
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

exports.isEmployee = async (req,res,next) =>{
    try {
        const user = await User.findById(req.user._id);
        console.log(user);
        if(user.role!=2){
            res.json({err:"Unauthorised"});
        }else{
            next();
        }
    } catch (err) {
        console.log(err);
    }
};
