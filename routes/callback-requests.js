let uuid = require('uuid');
let express = require('express');
let router = express.Router();

let CallbackRequest = require('../models/callback-requests').CallbackRequest;

router.get('/', async (req, res) => {
  let cbs = await CallbackRequest.find();
  res.send(cbs);
});

router.put('/', async (req, res) => {
  let newCallback = new CallbackRequest({
    id: uuid(),
    phoneNumber: req.body.phoneNumber,
    date: new Date()
  });
  await newCallback.save();
  res.send('Callback Accepted');
});

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  await CallbackRequest.deleteOne({ id });
  res.send('Callback Deleted!');
});

module.exports = router;
