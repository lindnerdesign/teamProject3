import React from "react";
import "./SearchForm.css";
import {Grid, Row, Col, Image} from "react-bootstrap";
import MediaQuery from 'react-responsive';

const SearchForm = props => (
  
<Grid> 
<h1 className="addressheader text-center">Find your Polling Place and Candidates</h1>
  <Row id="searchdiv">
  <Col xs={12} sm={8} md={8}>
  <form onSubmit={props.handleFormSubmit}>
    <div className="search">
      <h3 >Please fill out your address here</h3>
      <input
        value={props.line1}
        onChange={props.handleInputChange}
        name="line1"
        type="text"
        className="form-control"
        placeholder="Street Address"
        required
      />
      <input
        value={props.city}
        onChange={props.handleInputChange}
        name="city"
        type="text"
        className="form-control"
        placeholder="City"
        required
      />
      <input
        value={props.state}
        onChange={props.handleInputChange}
        name="state"
        type="text"
        className="form-control"
        placeholder="State"
        required
      />
      <input
        value={props.zip}
        onChange={props.handleInputChange}
        name="zip"
        type="text"
        className="form-control"
        placeholder="Zip"
        required
      />
      <button
        type="submit"
        className="btn btn-danger searchbtn"
      >
        Search
      </button>
      
      { props.loggedIn ? 
        <button
          type="submit"
          onClick={props.updateVoter}
          className="btn btn-primary pollupdate"
        >
          Update
        </button>
        : null }
    </div>
  </form>
  </Col >

  <Col xs={12} sm={2} md={2}>
  <MediaQuery minWidth={768}>
    <Image className="pollingimg" src="/polling.png" />
  </MediaQuery>
  </Col>

  </Row>
</Grid>
);

export default SearchForm;
