const User = require("../Models/userSchema")
const bcrypt = require("bcrypt")

const getRegister =(req, res) =>{

   res.render("register.ejs", {err:""})
}
const postRegister = async (req, res) =>{
  
 try {  const {username,email,password} = req.body
    (req.body)
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password,salt);
    await new User( { 
        username:username,
        email:email,
        password: hashedPw
    }).save();
    return res.redirect("/login")}
    catch(err){
        (err)
        if(err) return res.render("register.ejs",{err:err})
    }
}
module.exports = {
    getRegister,
    postRegister
}