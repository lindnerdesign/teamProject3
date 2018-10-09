import React, { Component } from "react";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Candidate from "../components/Candidate";
import Podcast from "../components/Podcast";

class Home extends Component {
  state = {
    voterInfo: {}
  }

  testVoteSmart = event => {
    API.apiVoteSmart()
    .then(result => {
      console.log(`VoteSmart result: ${JSON.stringify(result)}`)
      // this.setState({voterInfo: res});
    })
  };

  testCivic = event => {
    API.apiCivic()
    .then(result => {
      console.log(`Google Civic result: ${JSON.stringify(result)}`)
    })
  };

  testListenNotes = event => {
    API.apiListenNotes()
    .then(result => {
      console.log(`Listen Notes result: ${JSON.stringify(result)}`)
    })
  };

  render() {
    return (
      
      <div className="test">
      <SearchForm />
      <Candidate />
      <Podcast />

        {/* <Button
          onClick={this.testVoteSmart}
          style={{ float: "center", marginBottom: 10 }}
          className={"btn btn-success"}
        >
          Test Vote Smart
        </Button>
        <Button
          onClick={this.testCivic}
          style={{ float: "center", marginBottom: 10 }}
          className={"btn btn-success"}
        >
          Test Civic
        </Button>
        <Button
          onClick={this.testListenNotes}
          style={{ float: "center", marginBottom: 10 }}
          className={"btn btn-success"}
        >
          Test Listen Notes
        </Button> */}

      </div>
    );
  }
}

export default Home;
