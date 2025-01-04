const express = require("express");

const app = express();

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
app.delete("/test", (req, res) => {
  res.send("Data deleted");
});
// app.use("/nodemon", (req, res) => {
//   res.send("nodemon is the og server refresher ");
// });

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});
