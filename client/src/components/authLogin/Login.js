import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import API from "../../utils/API";
import NavBar from "../NavBar";
import { Row, Button } from "react-bootstrap";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

    const login = {
      username: this.state.username,
      password: this.state.password
    }
    API.loginVoter(login)
      .then((result) => {
        sessionStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: 'Login Successful' });
        this.setState({ login: true });
        sessionStorage.setItem('_id', result.data._id);
        sessionStorage.setItem('username', this.state.username);
        sessionStorage.setItem('loggedIn', true);
        this.props.history.push('/')
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password do not match' });
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
    return (
      <div className="container">
        <Row className="voteSearch">
          <NavBar />
        </Row>
        <form className="form-signin" onSubmit={this.onSubmit}>
          {this.state.message !== '' &&
            <div className="alert alert-danger alert-dismissible" role="alert">
              {this.state.message}
            </div>
          }
          <h2 className="form-signin-heading">Please sign in</h2>
          <input id="email"
            type="email"
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            className="form-control register"
            placeholder="Email address"
            required
          />
          <input type="password" className="form-control register" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} required />

          <Button bsStyle="danger" className="btn btn-lg btn-primary btn-block" type="submit">Login</Button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
          <p>
            Forgot Password? <Link to="/passwordrequest"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> Click here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
