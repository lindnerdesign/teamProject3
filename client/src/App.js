import React, { Component } from 'react';
import axios from 'axios';
import Button from "./components/Button";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  testVoteSmart = event => {

    let query = "http://api.votesmart.org/CandidateBio.getBio";

    axios.get(query, {
      params: {
        "key": "b255f096d0fcbe52ea0f5eddab340062",
        "candidateId":9490
      }
    }).then(result => {
      console.log(`API result: ${JSON.stringify(result)}`)
    })

  };

  testCivic = event => {

    let query = "https://www.googleapis.com/civicinfo/v2/representatives";

    axios.get(query, {
      params: {
        "key": "AIzaSyCdIEBO6FRk7y-5NsmCyAQPyGMh0Qru2tA",
        "address": "4139 Garfield Minneapolis MN"
      }
    }).then(result => {
      console.log(`Google Civic result: ${JSON.stringify(result)}`)
    })

  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button
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

      </div>
    );
  }
}

export default App;
