const express = require("express");

const { adminAuth ,userAuth} = require("./middlewares/auth");

const app = express();

//handle auth middleware for all request get, post ,delete ,put
app.use("/admin", adminAuth);

app.use("/user", (req, res) => {
  res.send("user data");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("server is sucessfully listening");
});
