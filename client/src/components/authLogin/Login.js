import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import API from "../../utils/API";

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


    // axios.post('/api/auth/login', { username, password })
    //   .then((result) => {
    //     localStorage.setItem('jwtToken', result.data.token);
    //     this.setState({ message: '' });
    //     this.props.history.push('/')
    //   })
    //   .catch((error) => {
    //     if(error.response.status === 401) {
    //       this.setState({ message: 'Login failed. Username or password do not match' });
    //     }
    //   });

      const login={
        username: this.state.username,
        password: this.state.password
      }
      API.loginVoter(login)
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: 'Login Successful' });
        this.props.history.push('/'+this.state.username)
      })
      .catch((error) => {
        if(error.response.status === 401) {
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
    //const { username, password, message } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          {this.state.message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { this.state.message }
            </div>
          }
          <h2 className="form-signin-heading">Please sign in</h2>
          <label name="inputEmail" className="sr-only">Email address</label>
          <input type="email" className="form-control" placeholder="Email address" name="username" value={this.state.username} onChange={this.handleInputChange} required/>
          <label name="inputPassword" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
