import React from "react";
import "./SavedPodcasts.css";
import {Grid, Row, Col, Button} from "react-bootstrap";

const SavedPodcasts = props => (
  
  <div className="podcast">
  <h1 className="addressheader text-center">Your Saved Podcasts</h1>

  <Grid>
  <Row>
    {props.podcasts.map((podcast, i) => (
      // Possibility of a same podcast saved multiple times, create a unique key for duplicates
      <Col xs={12} sm={6} md={6} key={i+podcast._id} className="podcastmap">
        <img src={podcast.thumbnail} alt="cover" className="podimage"/>
        <h3>{podcast.title}</h3>
        <p className="scrollbar">{podcast.description}</p>
        <p>{podcast.audio_length}</p>
        <Button bsStyle="primary" className="btn-lg" href={podcast.audio} target="_blank"><i className="fas fa-play-circle"></i></Button>
        <Button 
          bsStyle="danger" 
          className="podcastDel btn-lg" 
          onClick={() => props.removePodcast(podcast._id)}
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </Col>
    ))}
  </Row>
</Grid>
</div>
);

export default SavedPodcasts;
