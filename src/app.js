const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //validation of data

  try {
    validateSignupData(req);

    //encrypt  the password

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

    const data = req.body;
    console.log(data);

    // const ALLOW_FIELDS = [
    //   "firstName",
    //   "lastName",
    //   "age",
    //   "gender",
    //   "emailId",
    //   "skills",
    //   "password",
    //   "Url",
    //   "about",
    // ];

    // const isAllowed = Object.keys(data).every((k) => ALLOW_FIELDS.includes(k));

    // if (!isAllowed) {
    //   throw new Error("send a valid fields");
    // }

    await user.save();
    res.send("User  created successfully");
  } catch (err) {
    console.error("ERROR:" + err.message); // Log the error for debugging
    res.sendStatus(400); // Send a proper status code
  }
});

// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;

//     const user = await User.findOne({ emailId: emailId });

//     if (!user) {
//       throw new Error("Emailid is not present in DB");
//     }

//     const isPasswordValid = await bcrypt.compare(password,user.password);

//     if (isPasswordValid) {
//       res.send("Login Successfull");
//     }else{
//       throw new Error("Password is not correct")
//     }
//   } catch (err) {
//     res.status(400).send("something went wronged");
//   }
// });

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
