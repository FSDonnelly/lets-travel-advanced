let express = require("express");
let router = express.Router();

let User = require("../models/users").User;

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await User.find()
    .where({ email })
    .where({ password });
  if (user.length > 0) {
    res.send("Logged In");
  } else {
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
    let newUser = new User({
      email,
      password
    });
    await newUser.save();
    res.send("Registered");
  } else {
    res.send("Rejected");
  }
});

module.exports = router;
