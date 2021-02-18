const Course = require("../Models/courseSchema");
const User = require("../Models/userSchema");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const addCourseForm = (req, res) => {
  res.render("courseForm.ejs", { err: "" });
};

const addCourseFormSubmit = async (req, res) => {
  const { name, description, price } = req.body;
  const course = await new Course({
    name: name,
    description: description,
    price: price,
  }).save();
  const user = await User.findOne({ _id: req.user.user._id });
  user.addCourseList(course._id);
  console.log(user);
  res.redirect("/showCourses");
};

const showInstructorCourse = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id }).populate(
    "courseList"
  );
  console.log(user);
  res.render("instructorPage.ejs", { courses: user.courseList });
};

const showCourses = async (req, res) => {
  const data = await Course.find();
  res.render("showCourses.ejs", { err: "", data: data });
};

const addToShoppingCart = async (req, res) => {
  const courseId = req.params.id;
  // console.log(req.user.user)
  const user = await User.findOne({ _id: req.user.user._id });

  user.addToCart(courseId);
  console.log(user);

  const userWithCourse = await User.findOne({
    _id: req.user.user._id,
  }).populate("shoppingCart");
  console.log(userWithCourse.shoppingCart);
  res.render("shoppingCart.ejs", { cartItem: userWithCourse.shoppingCart });
};

const checkout = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id }).populate(
    "shoppingCart"
  );
  console.log(user.shoppingCart);
   // const price = Number(user.shoppingCart[0].price)
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:8000/shoppingSuccess",
    cancel_url: "https://example.com/cancel",
    payment_method_types: ["card"],
    line_items: user.shoppingCart.map(course=> {
        return{
            name:course.name,
            amount: course.price  * 100,
            quantity:1,
            currency:"sek"
        }
    }),
    
    mode: "payment",
  })
  console.log(session)
    

     res.render("checkout.ejs",{cartItem: user.shoppingCart, sessionId: session.id})
};
const shoppingSuccess = async (req, res)=>{

  const user =  await User.findOne({_id: req.user.user._id})
  user.shoppingCart = [];
  user.save();
  console.log(user)
  res.send(" din  varukorg är tomt . Vi skickar din beställning inom 3 dagar")

}

/* const checkoutPost =(req, res)=> {
    res.send("succ")
} */

module.exports = {
  addCourseForm,
  addCourseFormSubmit,
  showCourses,
  addToShoppingCart,
  showInstructorCourse,
  checkout,
  shoppingSuccess
  //checkoutPost
};
