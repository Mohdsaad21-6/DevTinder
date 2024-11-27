const express = require("express");

const app = express();
// console.log(app);





app.use("/hello/2", (req, res) => {
  res.send("Abra ka dabra from hello2 ");
});
app.use("/hello", (req, res) => {
  res.send("Hello sello bye from hello ");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server from test");
});

// app.use("/", (req, res) => {
//   res.send("Hello Worlds home from /");
// });

app.listen(7777, () => {
  console.log("server is sucessfully listening");
});

