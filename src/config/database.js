const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamesteNode:285509.com@namestenode.gyr33.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
