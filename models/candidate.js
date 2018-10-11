const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  candidateId: {type: String},
  ballotName: {type: String},
  electionParties: {type: String},
  electionDistrictId: {type: String},
  electionDistrictName: {type: String},
  electionOffice: {type: String},
  electionOfficeId: {type: String},
  electionDate: {type: String},
  runningMateId: {type: String},
  runningMateName: {type: String},
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
