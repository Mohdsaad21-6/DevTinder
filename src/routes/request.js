const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { connection } = require("mongoose");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

const requestRouter = express.Router();

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

      res.json({
        message: "Connection Request Sent Successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR " + error.message);
    }
  }
);

module.exports = requestRouter;
