import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";

export class NavbarView extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <Navbar className="navRegistration">
        <Container fluid>
          <Navbar.Brand href="#home">Radical 80's</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary">Sign In</Button>{" "}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}


