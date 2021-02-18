const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next)=>{
    const token = req.cookies.jwtToken;
    if(!token ) return res.render("login.ejs", {err:"Du måste logga in"})
  const validUser =   jwt.verify(token, process.env.SECRET_KEY)
  
  // läser in den här token data , lägger till token datan i req objektet. 
  //
  if(validUser) {
    req.user = validUser;
  }

  next();
}

module.exports = verifyToken;
