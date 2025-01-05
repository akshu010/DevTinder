const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth);
// app.use("/user",userAuth)
app.get("/admin/getAllData", (req, res) => {
  res.send("All Data send");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Created");
});
app.get("/user/userLogin", (req, res) => {
  res.send("User login sucessfully");
});

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});

// app.use("/", (req, res) => {
//   res.send("Add /test or /hello for responce from server ");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello from the server");
// });
// app.post("/test", (req, res) => {
//   res.send("testing done ");
// });
// app.get("/test", (req, res) => {
//   res.send({ firstName: "Akshay", lastName: "Shamra" });
// });
// app.use("/nodemon", (req, res) => {
//   res.send("nodemon is the og server refresher ");
// });
// app.use("/test", (req, res, next) => {
//   res.send("Data deleted");
//   console.log("1st middleware")
//   // next();
// });

// app.use("/test", (req, res, next) => {
//   // res.send("Data deleted");
//   console.log("2st middleware")
//   next();
// });
// app.use("/test", (req, res,next) => {
//   res.send("Data deleted");
//   // console.log("3st middleware")
//   next();
// });
