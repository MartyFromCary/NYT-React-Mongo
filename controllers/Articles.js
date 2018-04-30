const { Articles } = require("../models");

module.exports = {
  get: (req, res) =>
    Articles.find()
      .sort({ published: -1 })
      .then(articles => res.json(articles))
      .catch(err => res.status(422).json(err.errmsg)),
  create: (req, res) =>
    Articles.create(req.body)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err.errmsg)),
  delete: (req, res) =>
    Articles.remove({ _id: req.body._id })
      .then(msg => res.json(msg))
      .catch(err => res.status(422).json(err.errmsg))
};
