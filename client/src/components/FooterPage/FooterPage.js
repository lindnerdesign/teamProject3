import React from "react";
import "./FooterPage.css";
import { Col, Container, Row, Footer } from "mdbreact";
import MediaQuery from 'react-responsive';

const FooterPage = () => (
  
<Footer className="font-small pt-4 mt-4">
  <Container fluid className="text-md-left footercontent">
    <Row>
      <Col md="4" className="title">
      <h3>Vote Now</h3>
      <p>
        About group project information here. At odio animi distinctio, aut enim tempora nobis error odit mollitia. At odio animi distinctio, aut enim tempora nobis error odit mollitia. At odio animi distinctio, aut enim tempora nobis error odit mollitia.At odio animi distinctio, aut enim tempora nobis error odit mollitia.At odio animi distinctio, aut enim tempora nobis error odit mollitia.At odio animi distinctio, aut enim tempora nobis error odit mollitia.
      </p>
      </Col>

      <Col md="4">
      <h3 className="title resources">Helpful Resources</h3>
        <h4 className="list-unstyled resources">
          <a href="https://www.rockthevote.org/">Rock the Vote</a>
        </h4>
        <h4 className="list-unstyled resources">
          <a href="https://www.isidewith.com/">I Side With</a>
        </h4>
        <h4 className="list-unstyled resources">
          <a href="https://www.eac.gov/voters/resourcesforvoters/">U.S. Assistance Commission</a>
        </h4>
        <h4 className="list-unstyled resources">
          <a href="https://www.aapd.com/advocacy/voting/voter-resource-center/">Voter Resource Center - AADP</a>
        </h4>
        <h4 className="list-unstyled resources">
          <a href="https://www.accreditedschoolsonline.org/resources/students-and-first-time-voters/">First Time Voter Information</a>
        </h4>
      </Col>

      <Col md="4">
        <MediaQuery minWidth={1024}>
         <img src="../../logo.png" alt="Vote Now" className="footerlogo" />
        </MediaQuery>
      </Col>

    </Row>
  </Container>
  <div className="footer-copyright text-center py-3">
    <Container fluid>
      VOTE NOW Team Project 3  |  <a href="https://github.com/lindnerdesign/teamProject3">Github <i className="fab fa-github-square"></i></a>
    </Container>
  </div>
</Footer>
);

export default FooterPage;
