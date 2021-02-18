const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String,required:true, unique:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    token:String,
    tokenExpiration: Date,
    role:String,
    shoppingCart: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        }
    ],
    courseList: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course"
    }]
})

userSchema.methods.addToCart = async function(course){
    this.shoppingCart.push(course)
    this.save();
}

userSchema.methods.addCourseList = function(course){
    this.courseList.push(course)
    this.save();

}
const User = mongoose.model("user",userSchema);
module.exports = User;