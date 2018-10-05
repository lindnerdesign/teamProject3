// Imports
const db = require("../models");

// Exports
module.exports = (app) => {
  // Routes

  // Find
  app.get("/voter", function(req,res){
    db.Voter
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Find by id
  app.get("/voter/:id", function(req, res) {
    db.Voter
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  // Save voter info
  app.post("/saveVoter", (req,res) => {
    db.Voter
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

  // Delete voter by id
  app.delete("/voter/:id", function(req,res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

  // Update voter info
  app.put("/voter/:id", function(req,res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

} // End of Module Export