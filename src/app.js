const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
// const e = require("express");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // User is a blueprint of object...
  //user is actually a object...
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User  created successfully");
  } catch (err) {
    console.error("Error creating user:", err); // Log the error for debugging
    res.sendStatus(404); // Send a proper status code
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });

    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wronged");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted");
  } catch {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wronged");
  }
});
//update the data of the user

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;

  const data = req.body;
  // console.log(data);
  

  try {
   const user = await User.findByIdAndUpdate({ _id: userId },  data ,{returnDocument:"after"});
   console.log(user);
   
    res.send("User updated successfully");
  } catch {
    res.status(400).send("something went wrong");
  }
});
connectDB()
  .then(() => {
    console.log("Database connection is successfully established");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err); // Log the error
  });
