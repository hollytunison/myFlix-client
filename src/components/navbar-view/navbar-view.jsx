import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {NavbarView, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './nav-view.scss';

export class NavbarView extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <Navbar collaspeonselect="true" expand="lg" variant="dark" className="navbarMain">
        <Container>
          <Link className="navbarLinkText" to={`/`}>
            <div className="logoBrand">
              Rad Bad 80's
            </div>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav className="me-auto" variant="dark">
                <Link className="navbarLinkText" to={`/`}>
                  CRYPT
                </Link>
                <Link className="navbarLinkText" to={`/register`}>
                  REGISTER
                </Link>
                <Link className="navbarLinkText" to={`/users/${user}`}>
                  MY ACCOUNT
                </Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}