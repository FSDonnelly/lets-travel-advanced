let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let postsRouter = require('./routes/posts');
let callbacksRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');

app.set('view engine', 'ejs');

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

app.use(express.static('public'));
app.use('/posts', postsRouter);
app.use('/callbacks', callbacksRouter);
app.use('/emails', emailsRouter);

app.get('/sight', (req, res) => {
  res.render('sight', {
    title: 'Big Ben',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg/360px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg',
    date: '2021-07-04',
    text: 'Big Ben text.'
  });
});

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
