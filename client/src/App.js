import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import FooterPage from "./components/FooterPage";
import Wrapper from "./components/Wrapper";
import Login from "./components/authLogin";
import Register from "./components/authRegister";

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false
    }
  };
  // componentDidMount(){
  //   this.handleLocationChange(this.context.router.history.location);
  //   this.unlisten = 
  //   this.context.router.history.listen(this.handleLocationChange);
  // };

  handleLocationChange(location){
    console.log(`- - - location: '${location.pathname}'`);
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  updateLogin = ()=>{
    if(sessionStorage.getItem('loggedIn')){
      this.setState({
        login:true
      });
    }
  };
  render() {
    return (
      <Router>
      <div>
        <Hero />
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route path='/login' component={Login} />
          {/* <Route path='/login' component={() => <Login handleInputChange={this.handleInputChange} />} /> */}
          <Route path='/register' component={Register} />
          {/* <Route path='/:username' component={Home} /> */}
        </Wrapper>
        <FooterPage />
      </div>
    </Router>
    )
  }
}

export default App;
