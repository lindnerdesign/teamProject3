import React from "react";
// import { Link } from "react-router-dom";
import "./NavBar.css";
import {Navbar, Nav, NavItem, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => (

  <Navbar fluid inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">VOTE NOW</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/" className="navlink">
          Home
      </NavItem>
    </Nav>
      <Navbar.Form pullRight>
        <span className="loginUser">
          {sessionStorage.getItem('firstName') && sessionStorage.getItem('loggedIn') ? `Hi ${sessionStorage.getItem('firstName')}!` : null}
        </span>

        {sessionStorage.getItem('firstName') && sessionStorage.getItem('loggedIn') ? <Link to="/login">
          <Button bsStyle="danger">Sign Out</Button>
        </Link> : <Link to="/login">
            <Button bsStyle="danger">Sign In</Button>
          </Link>}
      </Navbar.Form>

    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
