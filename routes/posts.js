let uuid = require('uuid');
let path = require('path');
let express = require('express');
let router = express.Router();

let Post = require('../models/posts').Post;

router.get(`/`, async (req, res) => {
  let posts = await Post.find();
  res.send(posts);
});

router.post(`/`, async (req, res) => {
  let reqBody = req.body;
  let imgPath;
  if (reqBody.imageUrl) {
    imgPath = reqBody.imageUrl;
  } else {
    imgPath = req.file.path.substring(
      req.file.path.indexOf(path.sep),
      req.file.path.length
    );
  }

  router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await Post.deleteOne({ id });
    res.send('Deleted!');
  });

  let newPost = new Post({
    id: uuid(),
    title: reqBody.title,
    date: new Date(),
    description: reqBody.description,
    text: reqBody.text,
    country: reqBody.country,
    imageURL: imgPath
  });

  await newPost.save();
  res.send('Created');
});

module.exports = router;
