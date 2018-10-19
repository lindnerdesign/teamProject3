import React, { Component } from 'react';
import './PassReset.css';
import API from "../../utils/API";
import NavBar from "../NavBar";
import { Link } from 'react-router-dom';
import { Row, Col, Button, Grid } from "react-bootstrap";

class PassReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmpassword: '',
      message: '',
      confirmationMsg: ''
    };
  }
  onSubmit = (e) => {
    if (e) e.preventDefault();

    console.log(window.location.href)

    var email = window.location.href.split("/")[4]
    console.log(email)
    console.log(this.state.confirmpassword)
    var emailobj = {
      email: email,
      password: this.state.confirmpassword
    }
    API.sendChangePass(emailobj)
      .then((result) => {
        console.log("RESULT", result)
        this.setState({
          confirmationMsg: result.data.msg
        });
        //document.location.href="/";

      })
      .catch((error) => {
        console.log(error);


      });
  };
  handlePassword = (name, value) => {
    console.log(this.state.password, " " + value)
    if (name === "confirmpassword" && value !== this.state.password) {
      this.setState({
        message: 'Passwords must match'
      });
    }
    else if (name === "confirmpassword" && value === this.state.password) {
      this.setState({
        message: 'Passwords match!'
      });
    }
    else {
      this.setState({
        message: ''
      });
    }

  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      })
    this.handlePassword(name, value)
  };
  render() {
    return (
      <div className="container">
        <NavBar />
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <form className="form-signin" onSubmit={this.onSubmit}>
                <div>
                  {this.state.confirmationMsg !== ''
                    ? <div>
                      {this.state.confirmationMsg.toString().includes('successfully') ?
                        (<div className="alert alert-success" role="alert">
                          {this.state.confirmationMsg} <br/>
                          Please  <Link to="/login">Click Here </Link> to Login
                  </div>) : (<div className="alert alert-danger" role="alert">
                          {this.state.confirmationMsg}
                        </div>)}
                    </div>
                    : null
                  }</div>
                <h2 className="form-signin-heading">Password Reset</h2>
                <label name="inputPassword" className="sr-only">Password</label>
                <input type="password" className="form-control" placeholder="New Password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                <label name="inputPassword" className="sr-only">Password</label>
                <input type="password" className="form-control" placeholder="Confirm Password" name="confirmpassword" value={this.state.changepassword} onChange={this.handleInputChange} required />
                <span>{this.state.message}</span>
                <Button bsStyle="danger" className="btn btn-lg btn-primary btn-block" type="submit">Reset</Button>

              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default PassReset;
