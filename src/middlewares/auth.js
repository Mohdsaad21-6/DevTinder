const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {

  try{
  const { token } = req.cookies;

  if(!token){
    throw new Error("Invalid token")
  }

  const deCodedObj = await jwt.verify(token, "DEV@TINDER$790");

  const { _id } = deCodedObj;

  const user = await User.findById(_id);

  if(!user){
    throw new Error("user not found ")
  }
req.user=user;
next()}catch(err){
  res.status(400).send("ERROR "  +  err.message)
}

};

module.exports = {
  userAuth,
};
