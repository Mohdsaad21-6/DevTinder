const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  throw new Error("asdfghjk");
  //logic of db call and get user data

  res.send("user data");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    //log the errors
    res.sendStatus(500);
    // .send("something went wronged")
  }
});

app.listen(7777, () => {
  console.log("server is sucessfully listening");
});
