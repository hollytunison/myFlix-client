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
      <div>
        <Navbar className="nav" collapseOnSelect="true" bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              TUBULAR 80's
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">User</a>
      </Navbar.Text>
    </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
