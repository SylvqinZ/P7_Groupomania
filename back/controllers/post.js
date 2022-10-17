const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postData = JSON.parse(req.body.post);
  //const postData = req.body.post;
  delete postData._id;
  delete postData._userId;
  const post = new Post({
    ...postData,
    //userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Post créé !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
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

exports.updatePost = (req, res, next) => {
  let postObject = { ...req.body };
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
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
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
      console.log(filename);
    });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post /*.userId != req.auth.userId*/) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      const message = `The post couldn't be deleted, please try again`;
      res.status(500).json({ message, data: error });
    });
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likePost = (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
      Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
        .then(() => res.status(200).json({ message: "Like added" }))
        .catch((error) => res.status(400).json({ error }));
    } else if (!post.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
      Post.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
        .then(() => res.status(200).json({ message: "Dislike added" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      Post.findOne({ _id: req.params.id }).then((resultat) => {
        if (resultat.usersLiked.includes(req.body.userId)) {
          Post.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Like removed" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (resultat.usersDisliked.includes(req.body.userId)) {
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
