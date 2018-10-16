import React, { Component } from "react";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Candidate from "../components/Candidate";
import Podcast from "../components/Podcast";
import Button from "../components/Button";
import Row from "../components/Row";
import Col from "../components/Col";
import './Home.css';

class Home extends Component {
  stageId = "G"; // Set to General Election
  _id = "0";
  username = "";
  candidates = [];

  state = {
    username: "",
    firstName: "",
    lastName: "",

    line1: "",
    city: "",
    state: "",
    zip: "",

    podcasts: [],
    candidates: [], // Might not need this in state
    contests: [], // from google civic
    contest: [],
    officeId: "6" // Default to Senator
  }

  componentDidMount() {
    this.loadVoter();
  }

  componentDidUpdate() {
    this.username = window.sessionStorage.getItem("username");
    if (this.username && !this.state.username) {
      console.log(`username:`, this.username)
      this.setState({username:this.username})
      this.loadVoter();
    }
  }

  logout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem("username");
    window.location.reload();
  };

  callVoteSmart = (query) => {
    return API.apiVoteSmart(query)
  };

  callCivic = () => {
    const address = `${this.state.line1} ${this.state.city} ${this.state.state} ${this.state.zip}`
    console.log(address)
    // Get polling location address
    API.apiCivic(address)
      .then(res => {
        // console.log(`Google Civic result: `, res)
        if (res.data.hasOwnProperty("pollingLocations")) {
          // Save polling address to state
          this.setState({
            plocationName: res.data.pollingLocations[0].address.locationName,
            pline1: res.data.pollingLocations[0].address.line1,
            pcity: res.data.pollingLocations[0].address.city,
            pstate: res.data.pollingLocations[0].address.state,
            pzip: res.data.pollingLocations[0].address.zip,
            contests: res.data.contests
          })
          console.log(` Your polling place: `, res.data.pollingLocations[0].address)
          console.log(`Your contests`, res.data.contests)
        }
        else {
          console.log("Polling location not available")
        }
      })
      .catch(err => console.log(err));
  };

  testListenNotes = event => {
    API.apiListenNotes()
    .then(result => {
      console.log(`Listen Notes result: `, result)
      this.setState({podcasts:result.data.results})
    })
    .catch(err => console.log(err));
  };

  getCandidates = (zip, stageId) => {
    const query = {
      command: "Candidates.getByZip",
      params: { zip5: zip, stageId: stageId }
    }
    return this.callVoteSmart(query)
  }

  parseCandidates = (candidates) => {
    let pCandidates = candidates.map(candidate => {
      return this.getCandidateBio(candidate.candidateId[0])
        .then(res => {
          const candidateObj = {
            candidateId: candidate.candidateId[0],
            ballotName: candidate.ballotName[0],
            electionParties: candidate.electionParties[0],
            electionDistrictId: candidate.electionDistrictId[0],
            electionDistrictName: candidate.electionDistrictName[0],
            electionOffice: candidate.electionOffice[0],
            electionOfficeId: candidate.electionOfficeId[0],
            electionStateId: candidate.electionStateId[0],
            electionDate: candidate.electionDate[0],
            runningMateId: candidate.runningMateId[0],
            runningMateName: candidate.runningMateName[0],
            birthDate: res.data.bio.candidate[0].birthDate[0],
            birthPlace: res.data.bio.candidate[0].birthPlace[0],
            family: res.data.bio.candidate[0].family[0],
            homeCity: res.data.bio.candidate[0].homeCity[0],
            homeState: res.data.bio.candidate[0].homeState[0],
            religion: res.data.bio.candidate[0].religion[0],
            photo: res.data.bio.candidate[0].photo[0]
          }
          return candidateObj
        })
    })
    return Promise.all(pCandidates).then(data => {
      console.log(`pCandidates: `, data)
      // Save the candidate list to state
      // this.setState({ candidates: data })
      this.candidates = data;
    })
  }

  getCandidateBio = (candidateId) => {
    const query = {
      command: "CandidateBio.getBio",
      params: { candidateId: candidateId }
    }
    return this.callVoteSmart(query)
  }

  getVoter = () => {
    const query = { username: this.username }
    console.log(`getVoter query`, query)
    return API.getVoter(query)
  }

  loadVoter = () => {
    this.getVoter()
      .then(voterDB => {
        console.log(`loadVoter: `, voterDB)
        if (voterDB.data.length) {
          this._id = voterDB.data[0]._id;
          this.setState({
            firstName: voterDB.data[0].firstName,
            lastName: voterDB.data[0].lastName,
            line1: voterDB.data[0].address.line1,
            city: voterDB.data[0].address.city,
            state: voterDB.data[0].address.state,
            zip: voterDB.data[0].address.zip
          })
        }
        else {
          this.setState({
            line1: "",
            city: "",
            state: "",
            zip: ""
          })
        }
      })
  }

  saveVoter = event => {
    // Check if voter already saved in db
    this.getVoter()
      .then(voterDB => {
        if (voterDB.data.length) {
          console.log(`Voter in db`)
          // return voterDB.data;
        }
        else {
          // Save voter info to db
          const voterObj = {
            name: this.state.voterName,
            address: {
              line1: this.state.line1,
              city: this.state.city,
              state: this.state.state,
              zip: this.state.zip
            }
          }
          API.saveVoter(voterObj)
            .then(voterDB => {
              this._id = voterDB.data._id;
              console.log(`Save _id: ${this._id}`)
            })
        }
      })
      .catch(err => console.log(err));
  }

  updateVoter = (event) => {
    // Update voter info in db
    const voterObj = {
      name: this.state.voterName,
      address: {
        line1: this.state.line1,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }
    }
    return API.updateVoter(this._id, voterObj)
  }

  filterByContest = (contest) => {
    return ( contest.office.indexOf( this.state.contest ) > -1 )
  }

  filterByOfficeId = (contest) => {
    return (contest.electionOfficeId === this.state.officeId)
  }

  // Test Button
  candidateByOffice = (event) => {
    // console.log(`this.candidates: `, this.candidates)
    const arr = this.candidates.filter(this.filterByOfficeId)
    console.log(`arr: `, arr)
    this.setState({contest:arr});
  }

  // Google API candidate list
  testCandidate = (event) => {
    // test get candidate info
    const contestArr = this.state.contests.filter(this.filterByContest)
    console.log(`contestArr: `, contestArr)
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.callCivic();

    this.getCandidates(this.state.zip, this.stageId).then(res => {
      // console.log(`candidates by zip: `, res)
      // If candidate list != 0, parse response into an object
      if (res.data.candidateList.candidate.length) {
        this.parseCandidates(res.data.candidateList.candidate)
      }
    })
  };

  render() {
    return (

      <div className="test">
        <Row className="voteSearch">
          <Col size="12">
            <SearchForm
              line1={this.state.line1}
              city={this.state.city}
              state={this.state.state}
              zip={this.state.zip}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            ></SearchForm>
            {/* Test Form & Buttons */}
            <form>
              <label htmlFor="testForm">Select Contest</label>
              <select 
                value={this.state.officeId}
                onChange={this.handleInputChange}
                name="officeId"
                className="form-control" id="testForm"
              >
                <option value={6}>U.S. Senator</option>
                <option value={5}>U.S. Representative</option>
                <option value={3}>Governor</option>
                <option value={12}>Attorney General</option>
                <option value={44}>Secretary of State</option>
              </select>
            </form>
            <Button
              onClick={this.testCandidate}
              className={"btn btn-primary"}
            >
              Get Google Civic Candidates
            </Button>
            <Button
              onClick={this.candidateByOffice}
              className={"btn btn-primary"}
            >
              Candidates By Office
            </Button>

            <Button
              onClick={this.updateVoter}
              className={"btn btn-primary"}
            >
              Test Update Voter Info
            </Button>
            {/* End of Test Stuff */}
          </Col>
        </Row>

        <Row>
          <Col size="12">
            {/* Render only if there are candidates */}
            { this.state.contest.length > 0 &&
              <Candidate candidates={this.state.contest}/>
            }
          </Col>
        </Row>

        <Row className="votePodcast">
          <Col size="12">

            <Podcast 
              podcasts={this.state.podcasts}
              // thumbnail={this.state.thumbnail}
              // title={this.state.title}
              // description={this.state.description}
              // length={this.state.length}
              // audio={this.state.audio}
              >
            </Podcast>
          
            <Button
              onClick={this.testListenNotes}
              style={{ marginBottom: 10 }}
              className={"btn btn-success"}
            >
              Test Listen Notes
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
