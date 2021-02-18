const express = require("express");
const router = express.Router();
const verifyUser = require("../Middleware/verifyuser")
const {homeRender,homeInstructor} = require("../Controllers/homeControl");
const verifyTokenInstructor = require("../Middleware/verifyInstructor");

router.get("/", verifyUser , homeRender)

router.get("/logout", (req, res)=>{
    

    res.clearCookie("jwtToken").redirect("/login")
})

router.get("/instructor",verifyTokenInstructor,homeInstructor)



module.exports = router;