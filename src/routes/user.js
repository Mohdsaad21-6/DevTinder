const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggenInUser = req.user;

    const request = await ConnectionRequest.find({
      toUserId: loggenInUser._id,
      status: "interested",
    });

    res.json({
      message: "data fetched successfully",
      data: request,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = userRouter;
