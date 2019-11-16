let auth = require("../controllers/auth");

checkAuth = (req, res, next) => {
  let token = req.cookies["auth_token"];
  if (token && auth.checkToken(token)) {
    next();
  } else {
    res.status(400);
    res.send("Not Authorized");
  }
};

module.exports = checkAuth;
