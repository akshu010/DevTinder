const express = require("express");
const requestRouter = express.Router();
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require("../middlewares/auth");
app.use(express.json());
app.use(cookieParser());

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending Connection Request");
  res.send(user.firstName + " sent you a friend request");
});

module.exports = requestRouter;
