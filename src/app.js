const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Signup API for the user
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Sucessfully");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});

// get user by email id
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  //   const users = await User.findOne({ emailId: userEmail });
  //   res.send(users);
  // });
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.lenght === 0) {
      res.status(404).send("USer not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("USer not found");
  }
});

// Feed API - get / feed - get all the user from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("USer not found");
  }
});

// Delete a user API

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deletted Sucessfully");
  } catch (err) {
    res.status(404).send("USer not found");
  }
});

// API for update the data of the user


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
