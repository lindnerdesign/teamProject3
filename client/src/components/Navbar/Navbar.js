import React from "react";
// import { Link } from "react-router-dom";
import "./NavBar.css";
import {Navbar, Nav, NavItem, Button, NavDropdown, MenuItem} from "react-bootstrap";
import { Link } from "react-router-dom";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
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
      <NavItem eventKey={2} href="#">
        Saved
      </NavItem>
    </Nav>

    <Nav>
    <NavDropdown eventKey={3} title="Choose Election" id="election-dropdown">
      <MenuItem eventKey={3.1} className="dropdown">Election 1</MenuItem>
      <MenuItem eventKey={3.2} className="dropdown">Election 2</MenuItem>
      <MenuItem eventKey={3.3} className="dropdown">Election 3</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.4} className="dropdown">Link Placeholder</MenuItem>
    </NavDropdown>
    </Nav>

    <Navbar.Form pullRight>
    <Link to="/login">
      <Button bsStyle="danger">Sign In</Button>
    </Link>
    </Navbar.Form>

  </Navbar.Collapse>
</Navbar>
);

export default NavBar;
