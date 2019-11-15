let jwt = require("jsonwebtoken");
let secret = "wertyu3456";

generateToken = user => {
  let payload = {
    email: user.email,
    password: user.password
  };
  return jwt.sign(payload, secret);
};

checkToken = token => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, checkToken };
