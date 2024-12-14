const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shaadansari8081:LY78gIVxP0LZuNsR@devtinder.dczu9.mongodb.net/devTinder"
  );
};

module.exports=connectDB;