import React from "react";
import "./SearchForm.css";
import {Grid, Row, Col, Image} from "react-bootstrap";
import MediaQuery from 'react-responsive';

const SearchForm = props => (
  
<Grid> 
  <Row>
  <Col xs={12} sm={8} md={8}>
  <form>
  <h1 className="addressheader text-center">Find your Polling Place</h1>
    <div className="form-group search">
      <label htmlFor="fulladdress">Please fill out your address here</label>
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
        onClick={props.handleFormSubmit}
        className="btn btn-success"
      >
        Search
      </button>
      { props.loggedIn ? 
        <button
          type="submit"
          onClick={props.updateVoter}
          className="btn btn-primary"
        >
          Update
        </button>
        : null }
    </div>
  </form>
  </Col >

  <Col xs={12} sm={2} md={2}>
  <MediaQuery minWidth={650}>
    <Image className="pollingimg" src="/polling.png" />
  </MediaQuery>
  </Col>

  </Row>
</Grid>
);

export default SearchForm;
