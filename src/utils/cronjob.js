const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule(" 49 23 * * *", async () => {
  // Your code here
  //send emails to all people who got request the previos day

  try {
  const yesterday = subDays(new Date(),0);

  const yesterdayStart = startOfDay(yesterday);
  const yesterdayEnd = endOfDay(yesterday);

  
    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    console.log(listOfEmails)

    for (const email of listOfEmails) {
      //send email

      try {
        const res = await sendEmail.run(
          "New Friend Request Pendingfor " + email,
          "There are so many friend request pending, please login to Devtindercode.site and accept or reject the request"
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
