// const express = require("express");
// const connectDB = require("./config/database");
// const app = express();
// const User = require("./models/user");

// app.post("/signup", async (req, res) => {
//   const user = new User({
//     firstName: "Fahad",
//     lastName: "Ansari",
//     emailId: "Fahad@gmail.com",
//     password: "8887927092",
//     _id: "80819999999",
//   });

//   try {
//     await user.save();
//     res.send("User created successfully");
//   } catch (err) {
//     res.sendStatus("404");
//   }
// });

// connectDB()
//   .then(() => {
//     console.log("database connection is succesfully established");
//     app.listen(7777, () => {
//       console.log("server is sucessfully listening");
//     });
//   })
//   .catch((err) => {
//     console.error("database cant connected");
//   });
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
    await user.save();
    res.send("User  created successfully");
  } catch (err) {
    console.error("Error creating user:", err); // Log the error for debugging
    res.sendStatus(404); // Send a proper status code
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
