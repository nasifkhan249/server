const express = require("express");
const route = express.Router();

//middleware
const { requireSignin,isAdmin } =require("../middlewares/auth");


//controllers
const {
    creat,
    update,
    remove,
    list,
    read}= require("../controllers/catagory");

route.post("/creat",requireSignin,isAdmin,creat);
route.get("/list",list);
route.get("/read/:slug",read);
route.put("/update/:cetagoryID",requireSignin,isAdmin,update);
route.delete("/remove/:cetagoryID",requireSignin,isAdmin,remove);



module.exports = route;