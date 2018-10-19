// Imports
const axios = require("axios");
const db = require("../models");
const parseString = require('xml2js').parseString;
const keysFile = require("../keys.js");
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var ObjectId = require('mongoose').Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');
var pageUrl = "/passwordreset/";


// Exports
module.exports = (app) => {
  // Routes

  // Vote Smart Route
  app.get("/voteSmart", function (req, res) {
    let query = `http://api.votesmart.org/${req.query.command}`;

    // Convert query.params to an object, combine two objects to create new params object for api query
    const params = { "key": keysFile.votesmart.key, ...JSON.parse(req.query.params) }
    // console.log(params);

    axios.get(query, {
      params: params
    }
    ).then(result => {
      // Convert xml to JSON
      parseString(result.data, function (err, jsonres) {
        // console.log(`json: ${JSON.stringify(jsonres)}`)
        return res.json(jsonres);
      })
    }).catch(err => res.status(422).json(err));
  });

  // Google Civic Route
  app.get("/civic", function (req, res) {
    // console.log(req.query.address)
    let query = "https://www.googleapis.com/civicinfo/v2/voterinfo";

    axios.get(query, {
      params: {
        "key": keysFile.civic.key,
        "address": req.query.address
      }
    }).then(result => {
      console.log('Civic')
      // console.log(result.data)
      return res.json(result.data);
    }).catch(err => res.status(422).json(err));
  })

  // Listen Notes Route
  app.get("/listen", function (req, res) {
    let query = "https://listennotes.p.mashape.com/api/v1/search";

    axios.get(query, {
      params: {
        "genre_ids": "99,117",
        "language": "English",
        "q": "2018 elections",
        "sort_by_date": 1
      },
      headers: {
        "X-Mashape-Key": keysFile.listennotes.key,
        "Accept": "application/json"
      }
    }).then(result => {
      console.log('Listen')
      console.log(result.data)
      return res.json(result.data);
    }).catch(err => res.status(422).json(err));
  })

  // Database Routes

  // Find Voter
  // app.get("/voter", function (req, res) {
  //   console.log(`app.get`, req.query)
  //   db.Voter
  //     .findOne(req.query)
  //     .populate("podcasts")
  //     .then(dbModel => {
  //       console.log(`getVoter: ${dbModel}`)
  //       res.json(dbModel)
  //     })
  //     .catch(err => res.status(422).json(err));
  // });

  // Find voter by id
  app.get("/voter/:id", function (req, res) {
    db.Voter
      .findById(req.params.id)
      .populate("podcasts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Save voter info
  // app.post("/voter", (req, res) => {
  //   db.Voter
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // })

  //Register Voter - Saves voter to db
  app.post('/register', function (req, res) {
    console.log(`req body `, req.body);
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'Please enter username and password.' });
    } else {
      db.Voter
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => {
          if (err) {
            //res.status(400);
            return res.json({ success: false, msg: 'Email already exists. Please sign in or use another email.' });

          }
          res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
  });

  //Login as a voter
  app.post('/login', function (req, res) {
    db.Voter.findOne({
      username: req.body.username
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({ success: true, token: 'JWT ' + token, _id: user._id });
          } else {
            res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
        });
      }
    });
  });

  // Delete voter by id
  // app.delete("/voter/:id", function (req, res) {
  //   db.Voter
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // })

  // Update voter info
  app.put("/voter/:id", function (req, res) {
    db.Voter
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  //Password reset info
  app.post("/sendPassEmail", function (req, res) {
    console.log("sendPassRout", req.body.email)
    db.Voter.findOne({
      // where: {
      "username": req.body.email
      // id: req.user.id
      // }
    })
      .then(dbUser => {
        console.log("User from db:  ", dbUser)
        if (dbUser) {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'votenow2121@gmail.com',
              pass: 'Jjh@5682'
            }
          });
          //get host from request
          var hostname = req.get('host');

          if(app.get('env')==='development'){
             hostname = 'localhost:3000';
          }
           
          console.log(app.get('env'));
          var url = req.protocol + '://' + hostname + pageUrl + req.body.email;
         
          console.log(url);
          var mailOptions = {
            from: 'votenow2121@gmail.com',
            to: req.body.email,
            subject: 'VOTENOW PASSWORD RESET',
            html: "We received a request to reset the password for the Vote Now account associated with this e-mail address. If you made this request, please <a href='" + url + "'><strong>Click Here</strong></a><br/>If you did not request to have your password reset you can safely ignore this email.<br/><br/>Regards,<br/><br/>Vote Now"
          };
          transporter.sendMail(mailOptions, function (error, info) {
            console.log('SEND TO EMAIL');
            if (error) {
              console.log('WHY IS THERE AN ERROR', error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.json({
            "Success": "Email Sent Successfully."
          })
        } else {
          res.json({
            message: 'This username is already taken.'
          });
        }
      }).catch(function (err) {
        console.log(err);
      });
  });

  app.post('/passwordreset/savePass', function (req, res) {
    console.log(req.body);
    var username = req.body.email
    var salt = bcrypt.genSaltSync(10);
    var pass = bcrypt.hashSync(req.body.password, salt);
    db.Voter
      .update({ 'username': username }, { $set: { 'password': pass } }, function (err, results) {
        if (err) {
          console.log("err update", err)
          res.status(401).send({ success: false, msg: 'Can not save password.' });
        }
        else {
          res.status(200).send({ success: true, msg: 'Password changed successfully.' });
        }
      })
  });

  // Save a new Podcast to the db and associating it with a Voter
  app.post("/podcast/:podcastId/:voterId", function (req, res) {
    // If podcast not in db then create a new podcast
    // db.Podcast.create(req.body)
    console.log('begin')
    console.log(req.params.voterId)

    db.Podcast.findOneAndUpdate({ podcastId: req.params.podcastId }, req.body, { upsert: true, returnNewDocument: true })
      .then(dbPodcast => {
        console.log('Save Podcast')
        console.log(JSON.stringify(dbPodcast))
        console.log(req.params.voterId)
        return db.Voter.findOneAndUpdate({ _id: req.params.voterId }, { $push: { podcasts: (dbPodcast._id ? dbPodcast._id : req.params.podcastId) } }, { new: true })
          .populate("podcasts")
          .then(dbVoter => res.json(dbVoter))
          .catch(err => res.status(422).json(err));
      })
  });

  // Remove podcast from voter's list
  app.put("/podcast/:podcastId/:voterId", function (req, res) {
    return db.Voter.findOneAndUpdate({ _id: req.params.voterId }, { $pull: { podcasts: req.params.podcastId } }, (err, doc) => { })
      .populate("podcasts")
      .then(dbVoter => res.json(dbVoter))
      .catch(err => res.status(422).json(err));
  })
} // End of Module Export