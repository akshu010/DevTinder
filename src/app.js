const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());
// Signup API for the user
app.post("/signup", async (req, res) => {
  try {
    // Validate the user
    validateSignUpData(req);
    const { password, firstName, lastName, emailId, age } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Sucessfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
// login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = await jwt.sign(
        { _id: user._id },
        "DEV@TINDERBYAKSHAYSHARMA",
        { expiresIn: "3d" }
      );
      res.cookie("token", token, {
        expires: new Date(Date.now() + 48 * 3600000),
      });
      res.send("Login Sucessfull!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
// API to get the user profile
app.get("/profile", userAuth, async (req, res) => {
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

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending Connection Request");
  res.send(user.firstName + " sent you a friend request");
});

// Connect to the database
connectDB()
  .then(() => {
    console.log("DataBase connected sucesssfullly");
    app.listen(7777, () => {
      console.log("Server is running on the port 3000");
    });
  })
  .catch((err) => {
    console.log("DataBase not connected");
  });
