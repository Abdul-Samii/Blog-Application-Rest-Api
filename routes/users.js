const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update
router.put("/:id",async(req,res)=>{
    if(req.params.id === req.body.userId)
    {
        if(req.body.password)
        {
            const salt = bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);

        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            res.status(200).json(updateUser);
        }
        catch(err)
        {
            res.status(500).json(err);
        }
    }
    else{
        res.status(400).json("You can only edit your account");
    }
})

//delete
router.delete("/:id",async(req,res)=>{
    if(req.params.id === req.body.userId)
    {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully");
    }
    else{
        res.status(500).json("You can only delete your account");
    }
})

//view
router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(user)
        {
            const {password,...others} = user._doc;
            res.status(200).json(others);
        }
        else
        {
             res.status(404).json("No User Found")
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})
module.exports = router