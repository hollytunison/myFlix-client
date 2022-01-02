import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
} from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// Declare hook for each input
	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		/* Send a request to the server for authentication */
		axios
			.post('https://mysterious-plains-19334.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then((response) => {
				const data = response.data;
				props.onLoggedIn(data);
			})
			.catch((e) => {
				console.log('no such user');
			});
	};

	return (
		<Container className='loginContainer'>
			<Card className='loginCard'>
				<Card.Body>
					<Card.Title className='text-center'>
						Welcome to My 80s Vice!
					</Card.Title>
					<Card.Subtitle className='mb-2 text-muted text-center'>
						Please Login
					</Card.Subtitle>

					<Form>
						<Form.Group controlId='formUsername'>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							{/* code added here to display validation error */}
							{usernameErr && <p>{usernameErr}</p>}
						</Form.Group>

						<Form.Group controlId='formPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								className='mb-3'
								type='password'
								value={password}
								placeholder='Enter password'
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							{/* code added here to display validation error */}
							{passwordErr && <p>{passwordErr}</p>}
						</Form.Group>

						<Button className="loginButton" variant="dark" size="lg" type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
          <Card.Subtitle className="mt-4 text-muted text-left">New user? Register account below.</Card.Subtitle>
          <Link to={`/users`}>
            <Button className="registerButton" variant="dark" size="lg">Register</Button>
          </Link>
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
