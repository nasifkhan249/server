const express = require("express");
const router = express.Router();


//middlewares 
const {requireSignin,isAdmin,isEmployee} =require("../middlewares/auth");

//controllers

const { register,login,serect,UpdatedProfile} = require("../controllers/auth");


router.post("/register", register);
router.post("/login",login);


router.get("/auth-check",requireSignin, (req,res)=>{
    res.json({ok:true});
});
router.get("/admin-check",requireSignin,isAdmin , (req,res)=>{
    res.json({ok:true});
});
router.get("/employee-check",requireSignin,isEmployee,(req,res)=>{
    res.json({ok:true});
});
router.get("/serect",requireSignin,isAdmin,serect);
router.get("/UpdatedProfile",requireSignin,UpdatedProfile);



module.exports = router;