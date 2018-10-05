import React, { Component } from 'react';
import axios from 'axios';
import Button from "./components/Button";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  testAPI = event => {

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
          onClick={this.testAPI}
          style={{ float: "center", marginBottom: 10 }}
          className={"btn btn-success"}
        >
          Test API
        </Button>

      </div>
    );
  }
}

export default App;
