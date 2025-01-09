const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggenInUser = req.user;

    const request = await ConnectionRequest.find({
      toUserId: loggenInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "skills",
      "photoUrl",
      "gender",
    ]);

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

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "skills","age","gender,","about"];

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const logginInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: logginInUser._id, status: "accepted" },
        { fromUserId: logginInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === logginInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      message: "data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggenInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggenInUser._id }, { toUserId: loggenInUser._id }],
    }).select("fromUserId toUserId status");

    const hiddenUsersFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hiddenUsersFromFeed.add(req.fromUserId.toString());
      hiddenUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await user
      .find({
        $and: [
          { _id: { $nin: Array.from(hiddenUsersFromFeed) } },
          { _id: { $ne: loggenInUser._id } },
        ],
      })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.json({
      message: "data fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
module.exports = userRouter;
