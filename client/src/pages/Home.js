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

    plocationName:"",
    pline1:"",
    pcity:"",
    pstate:"",
    pzip:"",

    // Can you save object to react state?
    voterInfo: {
      address: {
        line1: "",
        city: "",
        state: "",
        zip:""
      }
    }
  }

  callVoteSmart = (query) => {
    API.apiVoteSmart(query)
    .then(result => {
      console.log(`VoteSmart result: ${JSON.stringify(result)}`)
    })
  };

  testCivic = () => {
    const address = `${this.state.line1} ${this.state.city} ${this.state.state} ${this.state.zip}`
    console.log(address)
    // Get polling location address
    API.apiCivic(address)
    .then(res => {
      // console.log(`Google Civic result: ${JSON.stringify(res)}`)
      // Save polling address to state
      this.setState({
        plocationName:res.data.pollingLocations[0].address.locationName,
        pline1:res.data.pollingLocations[0].address.line1,
        pcity:res.data.pollingLocations[0].address.city,
        pstate:res.data.pollingLocations[0].address.state,
        pzip:res.data.pollingLocations[0].address.zip
      })
      // Save voter address and polling location to db
      this.saveVoter({
        address: {
          line1: this.state.line1,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip
        },
        pollingLocation: {
          locationName:res.data.pollingLocations[0].address.locationName,
          line1:res.data.pollingLocations[0].address.line1,
          city:res.data.pollingLocations[0].address.city,
          state:res.data.pollingLocations[0].address.state,
          zip:res.data.pollingLocations[0].address.zip
        }
      })
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

  getElectionId = (zip) => {
    const query = {
      command: "Election.getElectionByZip",
      params: {zip5:zip}
    }
    this.callVoteSmart(query);
  }

  saveVoter = (voterInfo) => {
    API.saveVoter(voterInfo)
      .then(res => console.log("Voter Info Saved"))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // this.testCivic();
    this.getElectionId(this.state.zip);

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
        {/* <Button
          onClick={this.testVoteSmart}
          style={{ float: "center", marginBottom: 10 }}
          className={"btn btn-success"}
        >
          Test Vote Smart
        </Button> */}
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
