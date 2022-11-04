const Post = require("../models/post");
const User = require("../models/user");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  delete postObject._id;
  delete postObject._userId;

  // Checking given body.userId
  if (req.body.userId == "") {
    return res.status(401).json({ error: "wrong user" });
  } else {
    // Checking given user
    User.findOne({ _id: req.body.userId })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "user not found" });
        } else {
          // Checking giver body.userId vs auth.userId
          if (req.body.userId !== req.auth.userId) {
            res.status(403).json({ error: "not authorized" });
          } else {
            // Creating post
            const post = new Post({
              ...postObject,
              userId: req.body.userId,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            });
            post
              .save()
              .then(() => {
                res.status(201).json({ message: "post created" });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          }
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.updatePost = (req, res, next) => {
  let postObject = { ...req.body };
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId && req.auth.admin === 0) {
        res.status(403).json({ message: "Not authorized" });
      } else {
        if (req.file) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});

          postObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          };
        }
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Post updated !" });
          })
          .catch((error) => res.status(401).json({ error}));
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ createdAt: +1 })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId && req.auth.admin === 0) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post deleted" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
  .then((post) => {
    if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
      Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
        .then(() => 
        res.status(200).json({ message: "Like added" }))
        .catch((error) => 
        res.status(400).json({ error }));
    } else if (!post.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
      Post.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
        .then(() => 
        res.status(200).json({ message: "Dislike added" }))
        .catch((error) => 
        res.status(400).json({ error }));
    } else {
      Post.findOne({ _id: req.params.id }).then((res) => {
        if (res.usersLiked.includes(req.body.userId)) {
          Post.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
            .then(() => 
            res.status(200).json({ message: "Like removed" }))
            .catch((error) => 
            res.status(400).json({ error }));
        } else if (res.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            }
          )
            .then(() => res.status(200).json({ message: "Dislike removed" }))
            .catch((error) => res.status(400).json({ error }));
        }
      });
    }
  });
};
