/* eslint-disable max-len */
import React from 'react';
import {
  Card, Navbar, Nav,
} from 'react-bootstrap';
import logo from '../img/logo/logo1.svg';

const Footer = () => {
  const footerStyle = {
    fontSize: '1rem',
  };

  // const openTwitter = async () => {
  //   window.open('twitter.com/philo2022');
  // };

  return (
    <div style={footerStyle}>
      <Card className="text-left text-dark" bg="white" fluid="true">
        <Card.Body className="text-center">
          <div>
            <Navbar.Brand href="/" className="text-dark container-row-0">
              <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="Free Stock Photos"
              />
              Waldon
            </Navbar.Brand>
            {/* <div>- Share your artworks with the world.</div> */}
            <div className="container-social-row">
              <div id="twitter" className="text-dark">
                Created by Philo
                <button
                  type="button"
                  className="social-icon-btn color-dark"
                  onClick={() => window.open('https://twitter.com/philo2022')}
                >
                  <i className="bi bi-twitter item-social-icon" />
                </button>
              </div>
            </div>
          </div>
          <Nav className="justify-content-end">
            {/* <Nav.Link className="text-dark" href="/license">License</Nav.Link> */}
          </Nav>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Footer;
