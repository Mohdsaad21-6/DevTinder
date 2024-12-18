const mongoose = require("mongoose");
const validator=require("validator");
const jwt =require ("jsonwebtoken")



const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
    validate(value){
      if(!validator.isAlpha(value)){
        throw new Error(" firstName should be only letter!!!"+ value)
      }
    }
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value))
        throw new Error("Invalid Email"+value)
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a strong password")
    }
},
  },
  age: {
    type: Number,
    require: true,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("invalid photo url")
      }
  },
  },
  about: {
    type: String,
    default: "This is a about of the user",
  },
  skills: {
    type: [String],
  },
},{timestamps:true,});



userSchema.methods.getJWT =async function(){

  const user =this;
  const token =await jwt.sign({_id:"userId"},"DEV@TINDER$790",{
    expiresIn:"1h",
  })
  return token
}

module.exports = mongoose.model("User", userSchema);
