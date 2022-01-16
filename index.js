const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
    console.log("Connected!")
})

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>{
        cb(null,"abxc.png");
    },
});

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file",(req,res)=>{
    res.status(200).json("File has been uploaded");
}));

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);

app.listen(5500,()=>{
    console.log();
});