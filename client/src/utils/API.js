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
    console.log(`api id: `, id)
    return axios.get(`/voter/${id}`);
  },
  // Deletes voter info with the given _id - Remove?
  deleteVoter: function(id) {
    return axios.delete(`{/voter/${id}`);
  },
  // Saves a voter to the database - Remove?
  saveVoter: function(voterData) {
    return axios.post("/voter", voterData);
  },
  // Update voter info
  updateVoter: function(id,voterData){
    return axios.put(`/voter/${id}`, voterData);
  },
  // Register voter
  registerVoter: function(voterData){
    console.log(`register `, voterData);
    return axios.post("/register", voterData);
  },
  // Login voter
  loginVoter: function(loginData){
    console.log(`login `, loginData);
    return axios.post("/login", loginData);
  },
  // Save podcast
  savePodcast: function(podcastData,voterId){
    return axios.post(`/podcast/${podcastData.podcastId}/${voterId}`, podcastData)
  }
};
