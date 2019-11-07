let express = require('express');
let app = express();
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travels', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let PORT = process.env.PORT || 3000;

let Post = require('./models/posts').Post;

app.get(`/posts`, async (req, res) => {
  let posts = await Post.find();
  res.send(posts);
});

app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
