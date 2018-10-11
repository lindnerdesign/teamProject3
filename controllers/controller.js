// Imports
const axios  = require("axios");
const db = require("../models");
const parseString = require('xml2js').parseString;
const keysFile = require("../keys.js");

// Exports
module.exports = (app) => {
  // Routes

  // Vote Smart Route
  app.get("/voteSmart", function(req,res) {
    // console.log(`voteSmart req.query:`)
    // console.log(req.query)
    let query = `http://api.votesmart.org/${req.query.command}`;
    // console.log(`query`)
    // console.log(query)

    // Convert query.params to an object, combine two objects to create new params object for api query
    const params = {"key": keysFile.votesmart.key, ...JSON.parse(req.query.params)}
    console.log(params);

    axios.get(query, {
      params: params
      }
    ).then(result => {
        // console.log(`API result: ${JSON.stringify(result.data)}`)
        // Convert xml to JSON
        parseString(result.data, function(err,jsonres) {
          // console.log(`json: ${JSON.stringify(jsonres)}`)
          return res.json(jsonres);
      })
    }).catch(err => res.status(422).json(err));
  });

  // Google Civic Route
  app.get("/civic", function(req,res){
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
  app.get("/listen", function(req,res){
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
  // Find
  app.get("/voter", function(req,res){
    db.Voter
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Find voter by id
  app.get("/voter/:id", function(req, res) {
    db.Voter
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Find candidate by id
  app.get("/candidate/:id", function(req, res) {
    db.Candidate
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  })

  // Save voter info
  app.post("/voter", (req,res) => {
    console.log(`save voter`)
    console.log(req.body)
    db.Voter
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

  // Save candidate info
  app.post("/candidate", (req,res) => {
    db.Candidate
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  })

  // Delete voter by id
  app.delete("/voter/:id", function(req,res) {
    db.Voter
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

  // Update voter info
  app.put("/voter/:id", function(req,res) {
    db.Voter
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

} // End of Module Export