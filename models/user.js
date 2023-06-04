const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        address: {
            type: String,
        },
        role: {
            type: Number,
            default:0,
        }
    },
    { timestamps: true,versionKey:false }
);

const User = mongoose.model("User",userSchema);
module.exports = User;