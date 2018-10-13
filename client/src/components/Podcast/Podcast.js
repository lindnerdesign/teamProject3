import React from "react";
import "./Podcast.css";
import {Grid, Row, Col, Thumbnail, Button} from "react-bootstrap";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const Podcast = () => (
  
  <div className="podcast">
  <h1 className="addressheader text-center">Your Podcasts</h1>

  <Grid>
  <Row>
    <Col xs={12} sm={6} md={4}>
      <Thumbnail src="../placeholder-candidate.png" alt="242x200">
        <h3>Podcast Title</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Play</Button>
          <Button bsStyle="success podcastBtnSave">Save</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={12} sm={6} md={4}>
      <Thumbnail src="../placeholder-candidate.png" alt="242x200">
        <h3>Podcast Title</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Play</Button>
          <Button bsStyle="success podcastBtnSave">Save</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={12} sm={6} md={4}>
      <Thumbnail src="../placeholder-candidate.png" alt="242x200">
        <h3>Podcast Title</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Play</Button>
          <Button bsStyle="success podcastBtnSave">Save</Button>
        </p>
      </Thumbnail>
    </Col>
  </Row>
</Grid>


  </div>
);

export default Podcast;
