const path = require("path");
const Article = require(path.join(__dirname, "../models/Article"));

exports.addArticle = (req, res, next) => {
  delete req.body._id;
  const article = new Article({
    ...req.body,
  });
  article
    .save()
    .then(() => res.status(201).json({ message: "Article enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAllArticles = (req, res, next) => {
  Article.find({})
    .deleteMany()
    .then(() => {
      res.status(200).json({ message: "bdd vide" });
    })
    .catch((error) => res.status(400).json({ error }));
};
