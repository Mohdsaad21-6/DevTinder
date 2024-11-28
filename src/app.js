const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    //route handler 1
    // res.send("Route Handler 1")
    console.log("Handling the route user!!");
    // res.send("Response");
    next();
  },
  //route handler 2
  (req, res,next) => {
    console.log("Handling the route user2!!");
    res.send("Response 2nd");
    next();  
  },
  //route handler 3
  (req, res) => {
    console.log("Handling the route user3!!");
    res.send("Response 3nd");
  }
);

app.listen(7777, () => {
  console.log("server is sucessfully listening");
});
