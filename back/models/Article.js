const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  name: { type: String, required: false },
  realName: { type: String, required: false },
  realUrl: { type: String, required: false },
  url: { type: String, required: false },
  title: { type: String, required: false },
  preview: { type: String, required: false },
  content: { type: Array, required: false },
});

module.exports = mongoose.model("Article", articleSchema);
