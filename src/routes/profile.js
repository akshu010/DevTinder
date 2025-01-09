const express = require("express");
const profileRouter = express.Router();
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require("../middlewares/auth");
app.use(express.json());
app.use(cookieParser());

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
