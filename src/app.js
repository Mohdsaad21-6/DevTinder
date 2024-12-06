const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Fahad",
    lastName: "Ansari",
    emailId: "Fahad@gmail.com",
    password: "8887927092",
    _id: "80819999999",
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.sendStatus("404");
  }
});
 
connectDB()
  .then(() => {
    console.log("database connection is succesfully established");
    app.listen(7777, () => {
      console.log("server is sucessfully listening");
    });
  })
  .catch((err) => {
    console.error("database cant connected");
  });
