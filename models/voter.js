const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

const voterSchema = new Schema({
  firstName: { type: String},
  lastName: { type: String},
  address: {
    line1: { type: String},
    city: { type: String},
    state: {type: String},
    zip: {type: String}
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  podcasts: [{
    type: Schema.Types.ObjectId,
    ref: "Podcast"
  }]
});

voterSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

voterSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
