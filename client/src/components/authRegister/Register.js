import React, { Component } from 'react';
import './Register.css';
import API from "../../utils/API";
import NavBar from "../NavBar";
import { Row, Col, Button, Grid } from "react-bootstrap";

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
      zip: '',
      message: ''
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
        console.log(result);
        if (result.data.success === false) {
          this.setState({ message: result.data.msg });
        } else {
          this.setState({ message: 'Registration Successful. Please Login now' });
          //this.props.history.push("/login")

        }
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
        <Row className="voteSearch">
          <NavBar />
        </Row>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <form className="form-signin" onSubmit={this.onSubmit}>
              <div>
              {this.state.message !== ''
              ? <div>
              {this.state.message.toString().includes('Successful') ?
                  (<div className="alert alert-success alert-success" role="alert">
                    {this.state.message}
                  </div>):(<div className="alert alert-success alert-danger" role="alert">
                    {this.state.message}
                  </div>)}
              </div>
              :null
              }
                {/* {this.state.message.toString().includes('Successful') ?
                  (<div className="alert alert-success alert-success" role="alert">
                    {this.state.message}
                  </div>):
                  ({this.state.message !== '' ? (<div className="alert alert-success alert-danger" role="alert">
                    {this.state.message}
                  </div>):null})} */}
                  </div>
                <h2 className="form-signin-heading">Register</h2>
                <input
                  type="email"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  name="username"
                  type="text"
                  className="form-control register"
                  placeholder="Email address"
                  required
                />
                <input
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  name="firstName"
                  type="text"
                  className="form-control register"
                  placeholder="First Name"
                />
                <input
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  name="lastName"
                  type="text"
                  className="form-control register"
                  placeholder="Last Name"
                />
                <input
                  value={this.state.line1}
                  onChange={this.handleInputChange}
                  name="line1"
                  type="text"
                  className="form-control register"
                  placeholder="Street Address"
                />
                <input
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  name="city"
                  type="text"
                  className="form-control register"
                  placeholder="City"
                />

                <input
                  value={this.state.state}
                  onChange={this.handleInputChange}
                  name="state"
                  type="text"
                  className="form-control register"
                  placeholder="State"
                />
                <input
                  value={this.state.zip}
                  onChange={this.handleInputChange}
                  name="zip"
                  type="text"
                  className="form-control register"
                  placeholder="ZIP Code"
                />
                <input type="password" className="form-control register" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} required />
                <Button className="btn btn-lg btn-primary" type="submit">Register</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Create;
