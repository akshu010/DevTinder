const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName photoUrl age about gender skills";

userRouter.get("/user/requests/receaved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "intrested",
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({
      message: "Requests fetch sucesssfully",
      data: connectionRequests,
    });
  } catch (err) {
    throw new Error("ERROR :" + err.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest
      .map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      })
      .filter(Boolean);

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "ERROR: " + err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    
  } catch (err) {
    res.status(500).json({ error: "ERROR: " + err.message });
  }
});
module.exports = userRouter;
