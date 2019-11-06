let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
  id: Number,
  title: String,
  date: String,
  description: String,
  text: String,
  country: String,
  imageURL: String
});

let Post = mongoose.model('Post', postSchema);

module.exports = { Post };
