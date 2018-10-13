import React, { Component } from 'react';
import './Register.css';
import API from "../../utils/API";

class Create extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      line1: '',
      city: '',
      state: '',
      zip: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const voter = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: {
        line1: this.state.line1,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      },
      username: this.state.username,
      password: this.state.password

    }
    API.registerVoter(voter)
      .then((result) => {
        this.props.history.push("/login")
      });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Register</h2>
          <input type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.handleInputChange} required />
          <input
            value={this.state.firstName}
            onChange={this.handleInputChange}
            name="firstName"
            type="text"
            className="form-control"
            placeholder="First Name"
          />
          <input
            value={this.state.lastName}
            onChange={this.handleInputChange}
            name="lastName"
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
          <input
            value={this.state.line1}
            onChange={this.handleInputChange}
            name="line1"
            type="text"
            className="form-control"
            placeholder="Street Address"
          />
          <input
            value={this.state.city}
            onChange={this.handleInputChange}
            name="city"
            type="text"
            className="form-control"
            placeholder="City"
          />

          <input
            value={this.state.state}
            onChange={this.handleInputChange}
            name="state"
            type="text"
            className="form-control"
            placeholder="State"
          />
          <input
            value={this.state.zip}
            onChange={this.handleInputChange}
            name="zip"
            type="text"
            className="form-control"
            placeholder="ZIP Code"
          />
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Create;
