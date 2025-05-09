const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constant");
const User = require("../models/user");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const payment = require("../models/payment");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    //this order was coming from razor pay
    //copy from razorpay documnent
    //see notes

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100, // amount in paise
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        membershipType: membershipType,
      },
    });

    //save the order id in the database
    //return the order details to the frontend

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
    console.log(order);
  } catch (error) {
    console.log(error);
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("webhook called");
    const webhookSignature = req.get("X-Razorpay-signature");
    console.log(webhookSignature, "webhookSignature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: "Invalid webhook signature" });
    }

    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    //return the response to razorpay
    // if (req.body.event === "payment.captured") {
    // }

    // if (req.body.event === "payment.failed") {
    // }

    //update yhe user as premium

    console.log(paymentDetails);

    return res.status(200).json({ msg: "webhooked recieved successfully " });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user;
  if (user.isPremium) {
    return res.status(200).json({ isPremium: true });
  }

  return res.status(200).json({ isPremium: false });
});

module.exports = paymentRouter;
