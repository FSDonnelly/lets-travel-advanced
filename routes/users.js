let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");

let User = require("../models/users").User;
let auth = require("../controllers/auth");

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.find().where({ email });
  if (user.length > 0) {
    let comparePassword = await bcrypt.compare(password, user[0].password);
    if (comparePassword) {
      let token = auth.generateToken(user[0]);
      res.cookie("auth_token", token);
      res.send({
        redirectURL: "/admin"
      });
    } else {
      res.status(400);
      res.send("Rejected");
    }
  } else {
    res.status(400);
    res.send("Rejected");
  }
});

router.post("/register", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.find()
    .where({ email })
    .where({ password });
  if (user.length === 0) {
    let bcryptPassword = await bcrypt.hash(password, 12);
    let newUser = new User({
      email,
      password: bcryptPassword
    });
    await newUser.save();
    res.send("Registered");
  } else {
    res.send("Rejected");
  }
});

module.exports = router;
