let uuid = require("uuid");
let express = require("express");
let router = express.Router();
let authMiddleware = require("../middleware/auth");

let Email = require("../models/emails").Email;

router.get("/", authMiddleware, async (req, res) => {
  let emails = await Email.find();
  res.send(emails);
});

router.post("/", async (req, res) => {
  let reqBody = req.body;
  let newEmail = new Email({
    id: uuid(),
    email: reqBody.email,
    name: reqBody.name,
    text: reqBody.text,
    date: new Date()
  });
  await newEmail.save();
  res.send("Email Accepted");
});

router.delete("/:id", authMiddleware, async (req, res) => {
  let id = req.params.id;
  await Email.deleteOne({ id });
  res.send("Email Deleted!");
});

module.exports = router;
