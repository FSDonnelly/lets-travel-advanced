let express = require('express');
let app = express();
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travels', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static('public'));
app.use(express.json());

let PORT = process.env.PORT || 3000;

let Post = require('./models/posts').Post;
let id = 1;

app.get(`/posts`, async (req, res) => {
  let posts = await Post.find();
  res.send(posts);
});

app.post(`/posts`, async (req, res) => {
  let reqBody = req.body;
  let newPost = new Post({
    id: id++,
    title: reqBody.title,
    date: new Date(),
    description: reqBody.description,
    text: reqBody.text,
    country: reqBody.country,
    imageURL: reqBody.imageUrl
  });
  await newPost.save();
  res.send('Created');
});

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
