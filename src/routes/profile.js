const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user doesnt exist");
    }

    res.send(user);
  } catch {
    res.status(401).send("Unauthorized");
  }
});

module.exports = profileRouter;
