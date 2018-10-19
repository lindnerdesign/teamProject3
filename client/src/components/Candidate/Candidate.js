import React from "react";
import "./Candidate.css";
import {Grid, Row, Col} from "react-bootstrap";

const Candidate = props => (
  
  <div className="voteCandidate">
  <h1 className="addressheader text-center">Your Candidates</h1>
  <Grid>
    {props.districts.map(district => (
      <div key={district}>
        <h2 className="subhead text-center">{props.name}</h2>
        <Row>
        {props.candidates.map (candidate => (
          candidate.electionDistrictId === district && (
          <Col xs={12} sm={6} md={3} key={candidate.candidateId} className="candidatemap" >
              <img src={candidate.photo ? candidate.photo : "../../candidate-holder.jpg"} alt="242x200" className="candidateimg" height="250" />
              <h3>{candidate.ballotName}</h3>
              <p className="candidatep"><strong>Office:</strong> {candidate.electionOffice}</p>
              <p className="candidatep"><strong>District:</strong> {candidate.electionDistrictName}</p>
              <p className="candidatep"><strong>Party:</strong> {candidate.electionParties}</p>
              <p className="candidatep"><strong>Religion:</strong> {candidate.religion}</p>
              <p className="candidatep"><strong>Home:</strong> {candidate.homeCity}, {candidate.homeState}</p>
          </Col>
          )
        ))}
        </Row>
      </div>
    ))}
</Grid>

</div>
);

export default Candidate;
