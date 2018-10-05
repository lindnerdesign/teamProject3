import axios from "axios";

export default {
  // VoteSmart api
  apiVoteSmart: function() {
    return axios.get("/voteSmart");   
  },
  // Google Civic api
  apiCivic: function() {
    return axios.get("/civic");
  },
  apiListenNotes: function() {
    return axios.get("/listen");
  },
  // Database apis
  // Gets voter info
  getVoters: function() {
    return axios.get("/voter");
  },
  // Gets voter info with the given id
  getVoter: function(id) {
    return axios.get("/voter/" + id);
  },
  // Deletes voter info with the given id
  deleteVoter: function(id) {
    return axios.delete("/voter/" + id);
  },
  // Saves an article to the database
  saveVoter: function(voterData) {
    return axios.post("/voter", voterData);
  }
};
