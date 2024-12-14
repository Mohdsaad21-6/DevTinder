const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // User is a blueprint of object...
  //user is actually a object...
  const user = new User(req.body);

  try {
    const data = req.body;
    console.log(data);

    const ALLOW_FIELDS = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "emailId",
      "skills",
      "password",
      "Url",
      "about",
    ];

    const isAllowed = Object.keys(data).every((k) => ALLOW_FIELDS.includes(k));

    if (!isAllowed) {
      throw new Error("send a valid fields");
    }

    await user.save();
    res.send("User  created successfully");
  } catch (err) {
    console.error("Error creating user:", err); // Log the error for debugging
    res.sendStatus(400); // Send a proper status code
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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  console.log(userId);

  const data = req.body;
  // console.log(data);

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills can't be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // console.log(user);

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

app.patch("/edit", async (req, res) => {
  const email = req.body.emailId;

  const data = req.body;
  try {
    const user = await User.findOneAndUpdate({ emailId: email }, data);
    console.log(user);

    res.send("user edited successfully");
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
