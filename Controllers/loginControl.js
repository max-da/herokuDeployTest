const User = require("../Models/userSchema")
const bcrypt = require("bcrypt")
const { findOne } = require("../Models/userSchema")
const jwt = require("jsonwebtoken")
const err = "";
require("dotenv").config();
const getLogin = (req, res) => {
    res.render("login.ejs",{err:err})
}
const postLogin = async (req, res) => {
   try { const {email,password,username} =  req.body;
    if (!email || !password || !username) return res.render("login", {err:"Please enter all fields"})
    const user = await User.findOne({email:email,username:username})
    if (!user) return res.render("login.ejs",{err:"Incorrect username or email"})
    const validUser = await bcrypt.compare(password, user.password)

    if (!validUser) return res.render("login.ejs",{err:"Wrong password"})

    const jwtToken = await jwt.sign({user:user}, process.env.SECRET_KEY)
   
    if(jwtToken){
    const cookie = req.cookies.jwtToken
   
 
    if(!cookie) {
        res.cookie("jwtToken", jwtToken, {maxAge:360000000, httpOnly:true} )

    }
    return res.redirect("/")
}
return res.redirect("/login")
} 
   catch (err){
       (err)
       return res.render("login.ejs",{err:err})
   }
}

module.exports = {
    getLogin,
    postLogin
}