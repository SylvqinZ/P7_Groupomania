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
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
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
      if (req.userId !== req.auth.userId && req.auth.admin === false) {
        res.status(403).json({ message: "Not authorized" });
       
      } else {
        if (req.file) {
          
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});

          postObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
        }
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => {
            res.status(200).json({ message: "Post updated !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
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
      if (post.userId != req.auth.userId && req.auth.admin === false) {
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
    .then(async (post) => {
      if (!post) {
        res.status(404).json({ message: "post doesn't exist" });
      } else {
        let likes = post.likes;
        let dislikes = post.dislikes;
        let usersLiked = post.usersLiked;
        let usersDisliked = post.usersDisliked;

        switch (req.body.like) {
          case 1:
            usersDisliked = usersDisliked.filter(
              (element) => element !== req.auth.userId
            );
            usersLiked.addToSet(req.auth.userId);
            break;
          case -1:
            usersLiked = usersLiked.filter(
              (element) => element !== req.auth.userId
            );
            usersDisliked.addToSet(req.auth.userId);
            break;
          case 0:
            usersLiked = usersLiked.filter(
              (element) => element !== req.auth.userId
            );
            usersDisliked = usersDisliked.filter(
              (element) => element !== req.auth.userId
            );
            break;
          default:
            res.status(400).send({ message: "unknown" });
        }
        likes = usersLiked.length;
        dislikes = usersDisliked.length;
        let data = {
          usersDisliked: usersDisliked,
          usersLiked: usersLiked,
          likes: likes,
          dislikes: dislikes,
        };
        await post.updateOne({... data}, {new: true,timestamps: false});
        

        res.status(200).send({ message: "edit like", values: data });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};


