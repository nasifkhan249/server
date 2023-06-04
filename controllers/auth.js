const User = require("../models/user");
const {hashPassword,comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    try{
        // 1. destructure name, email, password from body.
        const { name, email, password} = req.body;
        // 2. all fields require validation.
        if(!name){
            return res.json({error : "Name must required"});
        }
        if(!email){
            return res.json({error: "Email must required"});
        }
        if(!password || password.length < 6){
            return res.json({error: "Password must required & also at least 6 characters long"});
        }

        // 3. check if email is taken.
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({error: "Email is already taken"});
        }
        // 4. making password hash.
        const hashpassword = await hashPassword(password);
        // 5. register user.
        const user = await new User({
            name:name,
            email:email,
            password:hashpassword,
        }).save();
        // 6. creat signed jwt
        const token = jwt.sign({_id: user._id},process.env.SECRET_KEY,{
            expiresIn: "7d",
        });

        // 7. send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });
    } catch (err) {
        console.log(err);
    };
};

exports.login= async (req,res)=>{
    try {
        //1 destructure password and email from req.body
        const { email ,password } =req.body;
        //2 validation check 
        if(!email){
            return res.json({err:"email must be required"});
        }

        if(!password || password.length <6){
            return res.json({err:"password must be required"});
        }

        //3 if email allready taken

        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return res.json({err:"User not found"})
        }

        //4 compare  password which is user give and data base set 

        const match = await comparePassword(password,user.password);
        console.log(match);
        if(!match){
            return res.json({err:" Invalid email and password must be required"});
        }

        //5 creat signed jwt
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"7d",});

        console.log(token);
        //7 send response 
        res.json({
            user:{
                Name:user.name,
                Email:user.email,
                Role:user.role,
                Address:user.address
            },
            token
        })
    } catch (err) {
        console.log(err);
    }


};

//testing
exports.serect=(req,res)=>{
    console.log(req.user);
    res.json({currentUser:req.user,
        message: "admin successfully entered in the controller"});
}

exports.UpdatedProfile=async(req,res)=>{
    try {
        //1 destructure name,password and adress from user give/req.body.
        const {name,password,address,role} = req.body;
        const user = await User.findById(req.user._id);
        console.log(user);

        //check password length
        if(password && password.length <6){
            res.json({err:"Password must be 6 charecter length"});
        }

        //hash the password
        const Passwordhash = password ? await hashPassword(password) : undefined;

        const updated = await User.findByIdAndUpdate(
            req.user._id,{
                name:name || user.name,
                password:Passwordhash || user.password,
                address:address || user.address,
                role:role ||user.role
            },
            {new:true}

        );
        updated.password=undefined;
        updated.role=undefined
        res.json(updated);
    } catch (err) {
        console.log(err);
    }
}


