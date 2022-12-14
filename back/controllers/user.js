const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getOneUser = (req, res) => {
	let userId = req.params.id;
	User.findOne({ _id: userId })
    .then((user) => res.status(200).json(user.username))
    .catch((error) => res.status(400).json({ error }));
};

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username,
        admin: req.body.admin
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created" }))
        .catch((error) => res.status(401).json({ error}));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "user not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "incorrect password" });
          }
          res.status(200).json({
            userId: user._id,
            admin: user.admin,
            token: jwt.sign({ userId: user._id ,admin: user.admin}, `${process.env.DB_SECRET_KEY}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
