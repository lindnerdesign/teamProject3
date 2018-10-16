import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import FooterPage from "./components/FooterPage";
import Wrapper from "./components/Wrapper";
import Login from "./components/authLogin";
import Register from "./components/authRegister";

class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false
    }
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <Router>
      <div>
        <NavBar login={this.state.login} />
        <Hero />
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route path='/login' component={Login} />
          {/* <Route path='/login' component={() => <Login handleInputChange={this.handleInputChange} />} /> */}
          <Route path='/register' component={Register} />
          <Route path='/:username' component={Home} />
        </Wrapper>
        <Footer />
      </div>
    </Router>
    )
  }
}

export default App;
