const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
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
