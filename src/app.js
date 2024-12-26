const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, age, about, skills, emailId, password } =
      req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      about,
      skills,
    });

    await user.save();
    res.send("User  created successfully");
  } catch (err) {
    console.error("ERROR:" + err.message);
    res.sendStatus(400);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user doesnt exist");
    }

    res.send(user);
  } catch {
    res.status(401).send("Unauthorized");
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  //sending a connection request
  res.send(user.firstName + "sent a request");
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
