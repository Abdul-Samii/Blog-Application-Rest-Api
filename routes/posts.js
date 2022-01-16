const router = require("express").Router();
const Post = require("../models/Post");


//New Post
router.post("/",async(req,res)=>{
    try{
        const newPost = new Post(req.body);
        const post = await newPost.save();
        res.status(200).json(post);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//Update Post
router.put("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try{
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
                res.status(200).json(updatePost);
            }
            catch(err)
            {
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You can only edit your posts");
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//Delete Post
router.delete("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try{
                const deletePost = await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("Deleted successfully");
            }
            catch(err)
            {
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You can only delete your posts");
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//View Post
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//get all
router.get("/",async(req,res)=>{
    const username = req.query.user;
    const category = req.query.category;
    try{
        let posts;
        if(username)
        {
            posts = await Post.find({username});
        }
        else if(category)
        {
            posts = await Post.find({categories:{
                $in:[category]
            }});
        }
        else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})


module.exports = router;