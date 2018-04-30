const { Articles } = require("../models");

module.exports = {
  get: (req, res) =>
    Articles.find()
      .then(articles => res.json(Articles))
      .catch(err => res.status(422).json(err.errmsg)),
  create: (req, res) =>
    Articles.create(req.body)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err.errmsg)),
  delete: (req, res) =>
    Articles.destroy({ _id: req.param.id })
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err.errmsg))
};
