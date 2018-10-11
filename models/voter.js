const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voterSchema = new Schema({
  id: { type: String},
  address: {
    line1: { type: String},
    city: { type: String},
    state: {type: String},
    zip: {type: String}
  },
  pollingLocation: {
    locationName:String, 
    line1:String, 
    city:String, 
    state:String, 
    zip:String
  },
  candidate: [{
    type: Schema.Types.ObjectId,
    ref: "Candidate"
  }]
  // date: { type: Date, default: Date.now }
});

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
