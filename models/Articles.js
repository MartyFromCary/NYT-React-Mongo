const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  headline: { type: String, required: true },
  byline: String,
  published: { type: Date, required: true },
  url: { type: String, required: true, unique: true }
});

const Articles = mongoose.model("Articles", userSchema, "articles");

module.exports = Articles;
