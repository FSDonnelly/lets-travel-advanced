require("dotenv").config();
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let multer = require("multer");
let cookieParser = require("cookie-parser");
let postsRouter = require("./routes/posts");
let callbacksRouter = require("./routes/callback-requests");
let emailsRouter = require("./routes/emails");
let usersRouter = require("./routes/users");
let Post = require("./models/posts").Post;
let auth = require("./controllers/auth");

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/travels", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, file.originalname)
});

app.use(express.json());
app.use(multer({ storage: imageStorage }).single("imageFile"));

let PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use("/posts", postsRouter);
app.use("/callbacks", callbacksRouter);
app.use("/emails", emailsRouter);
app.use("/users", usersRouter);

app.get("/sight", async (req, res) => {
  let id = req.query.id;
  let post = await Post.findOne({ id });
  res.render("sight", {
    title: post.title,
    imageURL: post.imageURL,
    date: post.date,
    text: post.text
  });
});

app.get("/admin", (req, res) => {
  let token = req.cookies["auth_token"];
  if (token && auth.checkToken(token)) {
    res.render("admin");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
