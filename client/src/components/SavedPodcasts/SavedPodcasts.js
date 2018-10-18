import React from "react";
import "./SavedPodcasts.css";
import {Grid, Row, Col, Button} from "react-bootstrap";

const SavedPodcasts = props => (
  
  <div className="podcast">
  <h1 className="addressheader text-center">Your Saved Podcasts</h1>

  <Grid>
  <Row>
    {props.podcasts.map(podcast => (
      <Col xs={12} sm={6} md={6} key={podcast._id} className="podcastmap">
        <img src={podcast.thumbnail} alt="cover" className="podimage"/>
        <h3>{podcast.title}</h3>
        <p className="scrollbar">{podcast.description}</p>
        <p>{podcast.audio_length}</p>
<<<<<<< HEAD
        <Button bsStyle="primary btn-lg" href={podcast.audio} target="_blank"><i className="fas fa-play-circle"></i></Button>
=======
        <Button bsStyle="primary" href={podcast.audio}><i className="fas fa-play-circle"></i></Button>
>>>>>>> UI tweaks
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
