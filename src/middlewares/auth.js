const adminAuth = (req, res, next) => {
  console.log("Admin auth is geeting checked");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
    console.log("User auth is geeting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
      res.status(401).send("Unauthorized access");
    } else {
      next();
    }
  };






module.exports = {
  adminAuth,
  userAuth
};
