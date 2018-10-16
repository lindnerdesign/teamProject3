import React from "react";
import "./Podcast.css";
import {Grid, Row, Col, Button} from "react-bootstrap";

const Podcast = props => (
  
  <div className="podcast">
  <h1 className="addressheader text-center">Your Podcasts</h1>

  <Grid>
  <Row>
    {props.podcasts.map(podcast => (
      <Col xs={12} sm={6} md={4} key={podcast.podcastsId} className="podcastmap">
        <img src={podcast.thumbnail} alt="cover"/>
        <h3>{podcast.title_original}</h3>
        <p className="podcastscroll">{podcast.description_original}</p>
        <p>{podcast.audio_length}</p>
        <Button bsStyle="primary" href={podcast.audio}>Play</Button>
        <Button bsStyle="success" className="podcastBtnSave">Save</Button>
      </Col>
    ))}
  </Row>
</Grid>
</div>
);

export default Podcast;
