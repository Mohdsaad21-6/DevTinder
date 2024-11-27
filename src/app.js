const express = require("express");

const app = express();

//ac  //abc
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    
  res.send({ firstname: "Mohd ", lastName: "Saad" });
});

app.listen(7777, () => {
  console.log("server is sucessfully listening");
});
