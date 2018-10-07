import React from "react";
import "./SearchForm.css";
import {Button} from "react-bootstrap";

const SearchForm = props => (
  
  <form className="search">
  <h1 className="addressheader text-center">Find your Polling Place</h1>
    <div className="form-group">
<<<<<<< HEAD
      <label htmlFor="fulladdress">Please fill out your address here</label>
      <input
        value=""
        onChange=""
        name="address"
        type="text"
        className="form-control"
        placeholder="Street Name"
        id="street"
      />
        
      <input
        value=""
        onChange=""
        name="city"
        type="text"
        className="form-control"
        placeholder="City Name"
        id="city"
      />

       <input
        value=""
        onChange=""
        name="state"
        type="text"
        className="form-control"
        placeholder="State"
        id="state"
      />

       <input
        value=""
        onChange=""
        name="address"
        type="text"
        className="form-control"
        placeholder="Street Name"
        id="street"
      />

      <Button bsStyle="danger" id="address">Submit</Button>
=======
      <label htmlFor="voterInfo">Enter Address:</label>
      <input
        value={props.line1}
        onChange={props.handleInputChange}
        name="line1"
        type="text"
        className="form-control"
        placeholder="Street"
      />
      <input
        value={props.city}
        onChange={props.handleInputChange}
        name="city"
        type="text"
        className="form-control"
        placeholder="City"
      />
      <input
        value={props.state}
        onChange={props.handleInputChange}
        name="state"
        type="text"
        className="form-control"
        placeholder="State"
      />
      <input
        value={props.zip}
        onChange={props.handleInputChange}
        name="zip"
        type="text"
        className="form-control"
        placeholder="Zip"
      />
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success"
      >
        Search
      </button>
>>>>>>> f8dbde0... Added search form & search by address call to civic api
    </div>
  </form>
);

export default SearchForm;
