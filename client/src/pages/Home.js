import React, { Component } from "react";
import API from "../utils/API";
import SearchForm from "../components/SearchForm";
import Candidate from "../components/Candidate";
import Podcast from "../components/Podcast";
import SavedPodcasts from "../components/SavedPodcasts";
import NavBar from "../components/NavBar";
import {Row, Col, Button} from "react-bootstrap";
import './Home.css';

class Home extends Component {
  stageId = "G"; // Set to General Election
  username = "";
  _id = "0"; // Can not be null
  candidates = [];
  uniqueDistricts;

  state = {
    username: "",
    firstName: "",
    lastName: "",

    line1: "",
    city: "",
    state: "",
    zip: "",

    plocationName: "",
    pline1: "",
    pcity: "",
    pstate: "",
    pzip: "",

    loggedIn:false,
    podcasts: [],
    savedPodcasts: [],

    contests: [], // from google civic
    contest: [], //  Used to pass subset of contests (i.e. Senate race) to Candidates component
    officeId: "6" // Default to Senator
  }

  componentDidMount() {
    console.log(`did`)
    this._id = window.sessionStorage.getItem("_id");
    console.log(`id`, this._id)
    this.loadVoter()
    .then(res => {
      this.getInfo()
    })
  }

  componentDidUpdate() {
    this.username = window.sessionStorage.getItem("username");
    if (this.username && !this.state.username) {
      console.log(`username:`, this.username)
      this.setState({username:this.username})
      this.setState({loggedIn:true})
      this._id = window.sessionStorage.getItem("_id");
      console.log(`will`)
    }
  }

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

  // Get polling & candidate info
  getInfo = () => {
    this.callCivic();
    this.getCandidates(this.state.zip, this.stageId)
    .then(res => {
      // console.log(`candidates by zip: `, res)
      // If candidate list != 0, parse response into an object
      if (res.data.candidateList.candidate.length) {
        this.parseCandidates(res.data.candidateList.candidate)
      }
    })
  }

  // Get candidates by zip code from VoteSmart API
  getCandidates = (zip, stageId) => {
    const query = {
      command: "Candidates.getByZip",
      params: { zip5: zip, stageId: stageId }
    }
    return this.callVoteSmart(query)
  }

  // Parse response from VoteSmart API into object
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
      this.candidates = data;
      this.candidateByOffice()
    })
  }

  // Get Candidate Bio using VoteSmart API
  getCandidateBio = (candidateId) => {
    const query = {
      command: "CandidateBio.getBio",
      params: { candidateId: candidateId }
    }
    return this.callVoteSmart(query)
  }

  // Find voter by id
  getVoter = (id) => {
    console.log(`getVoter id`, id)
    return API.getVoterById(id)
  }

  // Get voter information and set state variables
  loadVoter = () => {
    console.log(`loadVoter start _id:`,this._id)
    return this.getVoter(this._id)
      .then(voterDB => {
        console.log(`loadVoter: `, voterDB)
        // If voter found in db, set state variables
        // if (voterDB.data.length) {
          // this._id = voterDB.data[0]._id;
          this.setState({
            firstName: voterDB.data.firstName,
            lastName: voterDB.data.lastName,
            line1: voterDB.data.address.line1,
            city: voterDB.data.address.city,
            state: voterDB.data.address.state,
            zip: voterDB.data.address.zip,
            savedPodcasts: voterDB.data.podcasts
          });
        
          sessionStorage.setItem('firstName', voterDB.data.firstName);
      })
  }

  // Update voter information
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

  // Save podcast to Podcasts collection, and push on to voter's list of saved podcasts
  savePodcast = podcastObj => {
    // Save podcast, pass voter._id to save to voter document
    console.log(`save podcast: `, podcastObj)
    API.savePodcast(podcastObj,this._id)
      .then(podcastDB => {
        console.log(`podcastDB: `, podcastDB)
        this.setState({savedPodcasts:podcastDB})
      })
  }

  // Remove podcast from voter's podcast list
  removePodcast = id => {
    console.log(`remove podcast`)
    API.removePodcast(id,this._id)
      .then(voterDB => {
        // this.setState({savedPodcasts:voterDB.data.podcasts})
        console.log(`remove: `, voterDB)
      })
  }

  // Return an array of candidates for a specific contest (i.e. Senate) - Used with Google Civic API
  filterByContest = (contest) => {
    return ( contest.office.indexOf( this.state.contest ) > -1 )
  }

  // Return an array of candidates for a specific contest (i.e. Senate) - Used with VoteSmart API
  filterByOfficeId = (contest) => {
    return (contest.electionOfficeId === this.state.officeId)
  }

  // Remove duplicates from array
  arrayUnique = function (arr) {
    return arr.filter(function(item, index){
      return arr.indexOf(item) >= index;
    });
  };

  // Get a list of individual elections by district
  // Return an array with unique Office Ids (in a district there may be 2 contest i.e. 2 Senate Races)
  getDistrictIds = (contest) => {
    const districts = contest.map(district => {
      return (district.electionDistrictId)
    })
    // Remove duplicates from array
    this.uniqueDistricts = this.arrayUnique(districts);
    console.log(`uniqueDistricts: `, this.uniqueDistricts);
  }

  // Get candidates by office - display an individual contest - used with VoteSmart API
  candidateByOffice = () => {
    // console.log(`this.candidates: `, this.candidates)
    const arr = this.candidates.filter(this.filterByOfficeId)
    console.log(`arr: `, arr)
    this.getDistrictIds(arr);
    this.setState({contest:arr});
  }

  // Google API candidate list - Do we want to harvest any info from here? Remove?
  testCandidate = (event) => {
    // test get candidate info
    const contestArr = this.state.contests.filter(this.filterByContest)
    console.log(`contestArr: `, contestArr)
  }

  testStyle = {
    width: "50%",
    marginLeft: "15%",
    float: "left"
  }
  
  handleInputChange = event => {
    console.log(event.target.name);
    if(event.target.name ==='officeId'){
      const { name, value } = event.target;
      this.setState({
        [name]: value
      },
      ()=>{this.candidateByOffice()});
      
    }else{
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getInfo();
  };

  render() {
    return (

      <div className="test">
      <Row className="voteSearch">
      <NavBar loggedIn = {this.state.loggedIn} userName = {this.state.firstName}/>
      </Row>
        <Row className="voteSearch">
          <Col size="12">
            <SearchForm
              line1={this.state.line1}
              city={this.state.city}
              state={this.state.state}
              zip={this.state.zip}
              loggedIn={this.state.loggedIn}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              updateVoter={this.updateVoter}
            ></SearchForm>
          </Col>
        </Row>
        {this.state.plocationName ? 
        <Row>
          <Col xs={12} sm={8} md={8}>
            <div className="pollresults">
              <strong>Your Polling Place:</strong>
              <p><b>{this.state.plocationName}:</b> {this.state.pline1}, {this.state.pcity}, {this.state.zip}</p>
            </div>
          </Col>
        </Row>
        : null}
        {/* Test Form & Buttons */}
        <Row className="voteSearch">
          <Col xs={12} sm={8} md={8}>
            <form style={this.testStyle}>
              <h3 htmlFor="testForm">Select Contest</h3>
              <select 
                value={this.state.officeId}
                onChange={this.handleInputChange}
                //onSelect={this.candidateByOffice}
                name="officeId"
                className="form-control" id="testForm"
              >
                <option value={6}>U.S. Senator</option>
                <option value={5}>U.S. Representative</option>
                <option value={3}>Governor</option>
                <option value={4}>Lt. Governor</option>
                <option value={8}>State House</option>
                <option value={12}>Attorney General</option>
                <option value={44}>Secretary of State</option>
              </select>
            </form>
            <div style={this.testStyle}>
              {/* <Button
                onClick={this.testCandidate}
                bsStyle={"primary"}
              >
                Get Google Civic Candidates
              </Button> */}

              {/* <Button
                onClick={this.updateVoter}
                bsStyle={"primary"}
              >
                Test Update Voter Info
              </Button> */}
              <Button
                onClick={this.testListenNotes}
                bsStyle={"success"}
              >
                Get New Podcasts
              </Button>
            </div>
            {/* End of Test Stuff */}
          </Col>
        </Row>

        <Row>
          <Col size="12">
            {/* Render only if there are candidates */}
            { this.state.contest.length > 0 &&
              <Candidate 
                candidates={this.state.contest} 
                districts={this.uniqueDistricts} 
                name={this.state.contest[0].electionOffice}
              />
            }
          </Col>
        </Row>

        <Row className="votePodcast">
          <Col size="12">
            {/* Render only if there are saved podcasts */}
            { this.state.savedPodcasts.length > 0 &&
              <SavedPodcasts podcasts={this.state.savedPodcasts} removePodcast={this.removePodcast} />
            }
          </Col>
        </Row>

        <Row className="votePodcast">
          <Col size="12">
            {/* Render only if there are new podcasts */}
            { this.state.podcasts.length > 0 &&
              <Podcast podcasts={this.state.podcasts} savePodcast={this.savePodcast} loggedIn={this.state.loggedIn}/>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
