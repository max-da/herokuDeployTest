const userRouter = require("./Routes/userRoute")
const homeRouter = require("./Routes/homeRoute")
const courseRouter = require("./Routes/courseRoute")
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const options ={useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true, useCreateIndex: true}
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

mongoose.connect(process.env.DATABASE_LOG, options, (err)=>{
if (err){
    return console.log(err)
}
    app.listen(8000, ()=> {
        console.log("Körs i 8000")
    })
})

app.use(userRouter)
app.use(homeRouter)
app.use(courseRouter)