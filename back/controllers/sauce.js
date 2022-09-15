const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceData = JSON.parse(req.body.sauce);
  delete sauceData._id;
  delete sauceData._userId;
  const sauce = new Sauce({
    ...sauceData,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  let sauceObject = { ...req.body };
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "Not authorized" });
      } else {
        if (req.file) {
          // Deleting file
          const filename = sauce.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
          // Overriding sauceObject
          sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
        }
        // Updating sauce
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => {
            res.status(200).json({ message: "Sauce updated !" });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likeSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
      Sauce.updateOne(
        { _id: req.params.id },
        { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
      )
        .then(() =>
          res.status(200).json({ message: "Like added" })
        )
        .catch((error) => res.status(400).json({ error }));
    } else if (
      !sauce.usersDisliked.includes(req.body.userId) &&
      req.body.like === -1
    ) {
      Sauce.updateOne(
        { _id: req.params.id },
        { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
      )
        .then(() => res.status(200).json({ message: "Dislike added" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      Sauce.findOne({ _id: req.params.id }).then((resultat) => {
        if (resultat.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "Like removed" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (resultat.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
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

/*
exports.rateSauce = (req, res, next) => {
  // Utilisation de la méthode findOne en lui passant l'objet de comparaison. Ici on veut que l'id de la sauce soit le même que le paramètre de requête. //
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
        )
          .then(() =>
            res.status(200).json({ message: "Super! Cette sauce a été likée." })
          )
          .catch((error) => res.status(400).json({ error }));
      } 
      
      
      else if (
        sauce.usersLiked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "Aucun choix saisi." }))
          .catch((error) => res.status(400).json({ error }));



      } else if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Oups! Cette sauce a été dislikée." })
          )
          .catch((error) => res.status(400).json({ error }));
      } else if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          // Si le dislike est retiré envoi du code 200 et du message correspondant. //
          .then(() => res.status(200).json({ message: "Aucun choix saisi." }))
          // S'il y a une erreur envoi du code 400 et de l'erreur. //
          .catch((error) => res.status(400).json({ error }));
      } else {
        // Si une erreur est rencontré envoi du code 400 et du message correspondant. //
        return res
          .status(400)
          .json({ message: "L'opération n'a pas pu être effectuée." });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
*/
