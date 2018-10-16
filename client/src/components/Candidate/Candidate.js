import React from "react";
import "./Candidate.css";
import {Grid, Row, Col, Thumbnail, Button} from "react-bootstrap";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const Candidate = () => (
  
  <div>
  <h1 className="addressheader text-center">Your Candidates</h1>
  <Grid>
  <Row>
    <Col xs={12} sm={6} md={4}>
      <Thumbnail src="../placeholder-candidate.png" alt="242x200">
        <h3>Candidate Name</h3>
        <p>Bio</p>
        
      </Thumbnail>
    </Col>
    <Col xs={12} sm={6} md={4}>
      <Thumbnail src="../placeholder-candidate.png" alt="242x200">
        <h3>Candidate Name</h3>
        <p>Bio</p>
      
      </Thumbnail>
    </Col>
    <Col xs={12} sm={6} md={4}>
      <Thumbnail src="../placeholder-candidate.png" alt="242x200">
        <h3>Candidate Name</h3>
        <p>Bio</p>
       
      </Thumbnail>
    </Col>
  </Row>
</Grid>

</div>
);

export default Candidate;
