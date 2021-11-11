import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import { NavbarView } from '../navbar-view/navbar-view';

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
    <div className="regScreen">
      < NavbarView />
      <Container className="regLayout">

        <div className="text-center">
          <h2 className="creepyHeaders">Enter Skullify</h2>
          <p>Skullify is a platform created specifically for horror fanatics. Enjoy browsing a multitude of content such as TV series, movies, and reviews!</p>
          <p>Explore the deeper world of terror that awaits you..</p>
        </div>

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
  );
}


RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};