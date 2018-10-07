import React, { Component } from "react";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Candidate from "../components/Candidate";
import Podcast from "../components/Podcast";
import Button from "../components/Button";
import Row from "../components/Row";
import Col from "../components/Col";

class Home extends Component {
  state = {
    line1: "",
    city: "",
    state: "",
    zip:"",

    pollingLocation: {},

    voterInfo: {
      address: {
        line1: "",
        city: "",
        state: "",
        zip:""
      }
    }
  }

  testVoteSmart = event => {
    API.apiVoteSmart()
    .then(result => {
      console.log(`VoteSmart result: ${JSON.stringify(result)}`)
    })
  };

  testCivic = () => {
    const address = `${this.state.line1} ${this.state.city} ${this.state.state} ${this.state.zip}`
    console.log(address)
    API.apiCivic(address)
    .then(res => {
      // console.log(`Google Civic result: ${JSON.stringify(res)}`)
      this.setState({pollingLocation:res.data.pollingLocations[0].address})
      console.log(` Your polling place: ${JSON.stringify(res.data.pollingLocations[0].address)}`)
      return res;
    })
    .catch(err => console.log(err));
  };

  testListenNotes = event => {
    API.apiListenNotes()
    .then(result => {
      console.log(`Listen Notes result: ${JSON.stringify(result)}`)
    })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.testCivic();
  };

  render() {
    return (
      
      <div className="test">
        <Row>
          <Col size="md-12">
            <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            ></SearchForm>
            <Candidate />
            <Podcast />
          </Col>
        </Row>
        <Button
          onClick={this.testVoteSmart}
          style={{ float: "center", marginBottom: 10 }}
          className={"btn btn-success"}
        >
          Test Vote Smart
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
