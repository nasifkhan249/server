const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
          {
                name: {
                    type: String,
                    Trim: true,
                    required:true,
                    maxLength:32,
                    unique: true,
                },
                slug: {
                    type: String,
                    unique: true,
                    lowercase: true
                },
          },
          {timestamps:true,versionKey:false}
    
);

const CATAGORY = mongoose.model("CATAGORY",categorySchema);

module.exports = CATAGORY;