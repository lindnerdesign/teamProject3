import React, { Component } from 'react';
import API from './utils/API.js'
import Button from "./components/Button";
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
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
        <Button
          onClick={this.testListenNotes}
          style={{ float: "center", marginBottom: 10 }}
          className={"btn btn-success"}
        >
          Test Listen Notes
        </Button>

      </div>
    );
  }
}

export default App;
