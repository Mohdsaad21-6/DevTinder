const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

const requestRouter = express.Router();

const sendEmail=require("../utils/sendEmail")


requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          mesaage: "Invalid Status Types" + status,
        });
      }
      const toUser = await user.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User Not Found",
        });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection Request Already Exists",
        });
      }

      const data = await connectionRequest.save();

      const emailRes = await sendEmail.run(" a new friend request from"+req.user.firstName ,
        req.user.firstName + " is " + status + " in " + toUser.firstName,);
      console.log(emailRes);

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(404).json({
          message: "Invalid Status Type" + status,
        });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      }).populate(
        "fromUserId",
        "firstName lastName photoUrl age gender about skills"
      );

      if (!connectionRequest) {
        res.status(400).json({
          message: "Connection Request Not Found",
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();
      res.json({
        message: "Request " + status,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR " + error.message);
    }
  }
);

module.exports = requestRouter;
