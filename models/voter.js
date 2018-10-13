const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voterSchema = new Schema({
  name: { type: String},
  address: {
    line1: { type: String},
    city: { type: String},
    state: {type: String},
    zip: {type: String}
  }
  // date: { type: Date, default: Date.now }
});

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
