import React from "react";
import "./Candidate.css";
import {Grid, Row, Col, Thumbnail, Button} from "react-bootstrap";

const Candidate = props => (
  
  <div className="voteCandidate">
  <h1 className="addressheader text-center">Your Candidates</h1>
  <Grid>
  <Row>
    <Col xs={12} sm={6} md={4}>
      {props.candidates.map (candidate => (
        <Thumbnail key={candidate.candidateId} src={candidate.photo} alt="242x200">
        <h3>{candidate.ballotName}</h3>
        <p>{candidate.electionOffice}</p>
        <p>{candidate.electionDistrictName}</p>
        <p>{candidate.electionParties}</p>
        <p>{candidate.homeCity} {candidate.homeState}</p>
      </Thumbnail>
      ))}
    </Col>
  </Row>
</Grid>

</div>
);

export default Candidate;
