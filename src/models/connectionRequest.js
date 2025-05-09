const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.ObjectId,
      ref:"User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref:"User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not supported`,
      },
    },
  },
  { timestamps: true }
  //there is a issue with timestamps, it is not working sometimes 
);

//so query will be faster
//connectinrequest.find({fromUserId:1234567,toUserId:1234567})
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("User cannot send connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
