const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  //sending a connection request
  res.send(user.firstName + "sent a request");
});

module.exports = requestRouter;
