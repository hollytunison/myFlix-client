import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavbarView, Form, Button, Card, CardGroup, Container, Row, Col, FormGroup } from 'react-bootstrap';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(username);
  };

  return (
    <div className="registerScreen">
      < NavbarView />
    <Container>
      <Form>
    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday">
      <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      
      <Button className="registerButton" variant="primary" size="lg" type="submit" onClick={handleSubmit}>Register</Button>

    </Form>
    </Container>
    </div>
  )
}


RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};