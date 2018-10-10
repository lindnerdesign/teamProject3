import React, { Component } from "react";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Candidate from "../components/Candidate";
import Podcast from "../components/Podcast";
import Button from "../components/Button";
import Row from "../components/Row";
import Col from "../components/Col";


class Home extends Component {
  stageId = "G";
  electionId = "";
  
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

    candidates: []
  }

  
  callVoteSmart = (query) => {
      return API.apiVoteSmart(query)
  };

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
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

  getCandidates = (zip, stageId) => {
    const query = {
      command: "Candidates.getByZip",
      params: {zip5:zip, stageId:stageId}
    }
    return this.callVoteSmart(query)
  }

  parseCandidates = (candidates) => {
    let pCandidates = candidates.map(candidate => {
      const candidateObj = {
        candidateId:candidate.candidateId[0],
        ballotName:candidate.ballotName[0],
        electionParties:candidate.electionParties[0],
        electionDistrictId:candidate.electionDistrictId[0],
        electionDistrictName:candidate.electionDistrictName[0],
        electionOffice:candidate.electionOffice[0],
        electionOfficeId:candidate.electionOfficeId[0],
        electionDate:candidate.electionDate[0],
        runningMateId:candidate.runningMateId[0],
        runningMateName:candidate.runningMateName[0]
      }
      return candidateObj
    })
    console.log(`pCandidates: ${JSON.stringify(pCandidates)}`)
    // Save the candidate list to state
    this.setState({candidates:pCandidates})
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

    this.getCandidates(this.state.zip, this.stageId).then (res => {
      // console.log(`candidates by zip: ${JSON.stringify(res)}`)
      // If candidate list != 0, parse response into an object
      res.data.candidateList.candidate.length &&  this.parseCandidates(res.data.candidateList.candidate)
    })
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

export default Home;
