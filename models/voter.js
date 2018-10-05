const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voterSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
