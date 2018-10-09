import React from "react";
import "./SearchForm.css";
import {Button} from "react-bootstrap";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const SearchForm = props => (
  
  <form className="search">
  <h1 className="addressheader text-center">Find your Polling Place</h1>
    <div className="form-group">
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
    </div>
  </form>
);

export default SearchForm;
