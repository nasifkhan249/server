const User = require("../models/user");
const {hashPassword,comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    try{
        // 1. destructure name, email, password from body.
        const { name, email, password} = req.body;
        // 2. all fields require validation.
        if(!name.trim()){
            return res.json({error : "Name must required"});
        }
        if(!email.trim()){
            return res.json({error: "Email must required"});
        }
        if(!password.trim() || password.length < 6){
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
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{
            expiresIn: "7d",
        });

        // 7. send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                address: user.address,
            },
            token,
        });
    } catch (err) {
        console.log(err);
    };
};