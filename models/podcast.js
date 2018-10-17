const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
  podcastId: {type: String},
  thumbnail: {type: String},
  title: {type: String},
  description: {type: String},
  length: {type: String},
  audio: {type: String},
});

const Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = Podcast;
