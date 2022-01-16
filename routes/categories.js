const router = require("express").Router();
const Categories = require("../models/Category");


//Post Category
router.post("/",async(req,res)=>{
    const newCat = new Categories(req.body);
    try{
        const cat = await newCat.save();
        res.status(200).json(cat);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//Get Categories
router.get("/",async(req,res)=>{
    try{
        const categories = await Categories.find();
        res.status(200).json(categories);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

module.exports = router;