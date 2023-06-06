const CATAGORY = require("../models/category");
const sulgify = require("slugify");


exports.creat = async (req,res)=>{
    try {
        //1 destructuring name from request body

        const { name } = req.body;

        //2 validated

        if(!name){
            return res.json({err:"Name is must be required"});
        }

        //3 if name allready exit
        const existingCategory = await CATAGORY.find({name});
        // console.log(existingCategory);
        if(!existingCategory){
            return res.json({err:"Already exit"});
        }

        //4 creat a CATAGORY object and save it in database

        const catagory = await new CATAGORY({name:name,slug:sulgify(name)}).save();
        // console.log(catagory);
        res.json(catagory);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

exports.list = async (req,res)=>{
    try {
        const all = await CATAGORY.find({});
        res.json(all);
    } catch (err) {
        return res.status(400).json(err);
    }
};


exports.read = async (req,res) =>{
    try {
        const singleCetagory = await CATAGORY.findOne({slug:req.params.slug});
        res.json(singleCetagory);
    } catch (err) {
        return res.status(400).json(err);
    }
}


exports.update = async (req,res)=>{
    try {
        //1 destructuring name from request body
        const {name} = req.body;
        const {cetagoryID} = req.params;
        console.log(cetagoryID);
        const cetagory = await CATAGORY.findByIdAndUpdate(
            cetagoryID,
            {
                name:name,
                slug:sulgify(name),
            },
            {new:true}
        );
        console.log(cetagory);
        res.json(cetagory);
    } catch (err) {
        return res.status(400).json(err);
    };
};


exports.remove = async (req,res) =>{
    try {
        const {cetagoryID} = req.params;
        console.log(cetagoryID);
        const remove = await CATAGORY.findByIdAndDelete(
            cetagoryID
        );
        console.log(remove);
        res.json(remove);
    } catch (err) {
        return res.status(400).json(err);
    }
}