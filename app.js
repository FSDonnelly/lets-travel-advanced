let express = require('express');
let app = express();
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travels', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let PORT = process.env.PORT || 3000;

let Post = require('./models/posts').Post;

let post1 = new Post({
  id: 2,
  title: `Statue of Liberty`,
  date: new Date(),
  description: `Some description`,
  text: `Some Text`,
  country: `USA`,
  imageURL: `/images/2.jpg`
});

post1.save();

app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
