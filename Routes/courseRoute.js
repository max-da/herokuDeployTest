const { addCourseForm,checkout,shoppingSuccess,addCourseFormSubmit,showCourses,addToShoppingCart, showInstructorCourse } = require("../Controllers/courseControl")
const express = require("express");
const verifyTokenInstructor = require("../Middleware/verifyInstructor");
const verifyToken = require("../Middleware/verifyuser");
const router = express.Router();

router.get("/addCourse", verifyTokenInstructor, addCourseForm)

router.post("/addCourse", verifyTokenInstructor, addCourseFormSubmit)

router.get("/showCourses", verifyToken, showCourses)

router.get("/showMyCourses", verifyTokenInstructor, showInstructorCourse)

router.get("/showShoppingCart", verifyToken, addToShoppingCart)

router.get("/addToShoppingCart/:id", verifyToken, addToShoppingCart)

router.get("/checkout", verifyToken, checkout)
router.get("/shoppingSuccess", verifyToken, shoppingSuccess)
module.exports = router;