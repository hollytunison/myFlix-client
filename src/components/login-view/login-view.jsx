import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Nav,
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container fluid className="loginContainer">
      <Navbar bg="navColor" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Back to the 80's</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              New user? <a href="#login">Register here</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Card className="loginCard">
        <Card.Body>
          <Card.Title className="text-center">
            Welcome to Back to the 80's!
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            Please Login
          </Card.Subtitle>

          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className="customButton"
              variant="secondary"
              size="lg"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
