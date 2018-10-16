import React from "react";
import "./Candidate.css";
import {Grid, Row, Col, Thumbnail} from "react-bootstrap";

const Candidate = props => (
  
  <div className="voteCandidate">
  <h1 className="addressheader text-center">Your Candidates</h1>
  <Grid>
    {props.districts.map(district => (
      <div key={district}>
        <h3 className="text-center">{props.name}</h3>
        <Row>
        {props.candidates.map (candidate => (
          candidate.electionDistrictId === district && (
          <Col key={candidate.candidateId} xs={12} sm={6} md={4}>
              <Thumbnail src={candidate.photo ? candidate.photo : "https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/atom_page_thumbnail/public/thumbnails/image/placeholder-profile_3.png?itok=rAELdVbe"} alt="242x200">
              <h3>{candidate.ballotName}</h3>
              <p>{candidate.electionOffice}</p>
              <p>{candidate.electionDistrictName}</p>
              <p>{candidate.electionParties}</p>
              <p>{candidate.homeCity} {candidate.homeState}</p>
            </Thumbnail>
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
