const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

//register
router.post('/register',async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    try{
         req.body.password =  await bcrypt.hash(req.body.password,salt);
         console.log(req.body.password);
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})


//login
router.post('/login',async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(404).json("No User Found");

        const validated = await bcrypt.compare(req.body.password,user.password);
        !validated && res.status(400).json("Wrong Password");

        res.status(200).json(user);
    }
    catch(err)
    {
        console.log(err);
    }
})


module.exports = router;

