let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');

mongoose.connect('mongodb://localhost/travels', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

app.use(express.json());
app.use(multer({ storage: imageStorage }).single('imageFile'));

let PORT = process.env.PORT || 3000;

let Post = require('./models/posts').Post;
let id = 1;

app.get(`/posts`, async (req, res) => {
  let posts = await Post.find();
  res.send(posts);
});

app.post(`/posts`, async (req, res) => {
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

  let newPost = new Post({
    id: id++,
    title: reqBody.title,
    // date: new Date(),
    description: reqBody.description,
    text: reqBody.text,
    country: reqBody.country,
    imageURL: imgPath
  });

  await newPost.save();
  res.send('Created');
});

app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
