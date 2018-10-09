import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Discover from "./pages/Discover";
import Home from "./pages/Home";
// import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Hero />
      <Wrapper>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/about" component={Home} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/search" component={Search} /> */}
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
