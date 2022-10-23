const mongoose = require("mongoose");

const mongodbErrorHandler = require("mongoose-mongodb-errors");
mongoose.plugin(mongodbErrorHandler);

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  // avatar: { type: String, required: true },
  title: { type: String, required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, default: Date.now },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  //usersLiked: { type: [String] },
  //usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Post", postSchema);
