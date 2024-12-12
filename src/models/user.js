const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
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
  },
  password: {
    type: String,
    required: true,
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
  },
  about: {
    type: String,
    default: "This is a about of the user",
  },
  skills: {
    type: [String],
  },
},{timestamps:true,});

module.exports = mongoose.model("User", userSchema);
