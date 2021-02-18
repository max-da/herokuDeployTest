const User = require("../Models/userSchema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"max.dahlbo@gmail.com",
            pass: "Drakenibaken666"
        }
})


const getReset = (req, res) =>{
    res.render("reset.ejs", {err:""})
}


const postReset = async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({email:email});


    if (!user) return res.redirect("/register");
    const token = crypto.randomBytes(32).toString("hex")

    user.token = token;
    user.tokenExpiration = Date.now() + 36000000;
    await user.save();

    await transport.sendMail({
        from:"noreply@localhost.com",
        to: user.email,
        subject: "reset",
        html: `<a href ="http://localhost:8000/reset/${user.token}">Klicka`
    })
    res.render("checkMail.ejs")
}
//postReset
const resetParams  = async(req, res)=> {
    const token = req.params.token;
    (req.params.token)
    try {
        const user = await User.findOne({token:token, tokenExpiration:{ $gt: Date.now()}})
        if (!user) return res.redirect("/register");
        res.render("resetPasswordForm.ejs", {err:"", email:user.email})
    }
    catch(err){
        res.render("reset.ejs",{err:"Försök igen"})
        (err)
    }
}

const resetFormSubmit = async (req, res)=>{
    const password = req.body.password;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    const user = await User.findOne({email:email});

    user.password = hashedPw;
    await user.save(); 
    res.redirect("/login");
}
module.exports = {
    getReset,
    postReset,
    resetParams,
    resetFormSubmit
}