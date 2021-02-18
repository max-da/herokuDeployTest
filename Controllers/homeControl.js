const homeRender = (req, res)=>{

    // nåt i request har alla information
 
 
   
 
 
     res.render("home.ejs", {user: req.user.user} )
 
 
 }
 const homeInstructor = (req, res)=>{
    console.log(req.user.user)
    res.render("instructorHome.ejs", {user:req.user.user})
 }
 
 module.exports = {
     homeRender,
     homeInstructor
 }