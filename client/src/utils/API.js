import axios from "axios";


axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
export default {
  // VoteSmart api

  apiVoteSmart: function(query) {
    return axios.get("/voteSmart", {
      params: query
    });   
  },
  // Google Civic api
  apiCivic: function(address) {
    console.log(address)
    return axios.get("/civic", {
      params: {
        address:address
      }
    });
  },
  apiListenNotes: function() {
    return axios.get("/listen");
  },
  // Database apis
  // Gets voter info
  getVoter: function(query) {
    return axios.get("/voter", {
      params:query
    });
  },
  // Find voter info with the given _id
  getVoterById: function(id) {
    return axios.get(`/voter/${id}`);
  },
  // Find candidate
  getCandidateById: function(id) {
    return axios.get(`/candidate/${id}`);
  },
  // Deletes voter info with the given _id
  deleteVoter: function(id) {
    return axios.delete(`{/voter/${id}`);
  },
  // Saves an article to the database
  saveVoter: function(voterData) {
    return axios.post("/voter", voterData);
  },
  // Save candidate info to database
  saveCandidate: function(candidateData) {
    return axios.post("/candidate", candidateData);
  },
  // Update voter info
  updateVoter: function(id,voterData){
    return axios.put(`/voter/${id}`, voterData);
  }
};
