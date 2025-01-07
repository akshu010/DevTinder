const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
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
      res.send("Login Sucessfull!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "age", "about", "gender", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated sucessfully");
  } catch (err) {
    res.status(404).send("Update Failed " + err.message);
  }
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
