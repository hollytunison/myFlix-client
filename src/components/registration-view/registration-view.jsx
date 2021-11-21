import React, { useState } from "react";
import PropTypes from "prop-types";
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
  Button,
} from "react-bootstrap";
import { NavbarView } from "../navbar-view/navbar-view";

import axios from "axios";
import "./registration-view.scss";

// export function LoginView(props) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     /* Send a request to the server for authentication */
//     axios.post('https://mysterious-plains-19334.herokuapp.com/login', {
//       Username: username,
//       Password: password
//     })
//     .then(response => {
//       const data = response.data;
//       props.onLoggedIn(data);
//     })
//     .catch(e => {
//       console.log('no such user')
//     });
//   };



export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://mysterious-plains-19334.herokuapp.com/users' , {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
      .then(response => {
        const data = response.data;
        props.onRegistration(data.Username);
      })
      .catch(e => {
        console.log('no such user')
      })
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

      <Row>
        <Col>
          <CardGroup>
            <Card className="registerCard">
              <Card.Body>
                <Card.Title className="text-center">
                  Welcome to Back to the 80's!
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  Please Register
                </Card.Subtitle>

                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    className="registerButton"
                    variant="secondary"
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
