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

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setUsernameErr('Username Required');
			isReq = false;
		} else if (username.length < 2) {
			setUsernameErr('Username must be 2 characters long');
			isReq = false;
		}
		if (!password) {
			setPasswordErr('Password Required');
			isReq = false;
		} else if (password.length < 6) {
			setPassword('Password must be 6 characters long');
			isReq = false;
		}

		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			/* Send a request to the server for authentication */
			axios
				.post('https://test-myflix.herokuapp.com/login', {
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
		}
	};

	return (
		<Container className='loginContainer'>
			<Card className='loginCard'>
				<Card.Body>
					<Card.Title className='text-center'>
						<h1>Welcome to</h1>
						<h2>my80s Vice!</h2>
					</Card.Title>
					<Card.Subtitle className='mb-2 text-muted text-center'>
						Please Login
					</Card.Subtitle>
					<Form>
						<Form.Group controlId='formUsername'>
							<Form.Label> Username </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							{/* code added here to display validation error */}
							{usernameErr && <p> {usernameErr} </p>}
						</Form.Group>
						<Form.Group controlId='formPassword'>
							<Form.Label> Password </Form.Label>
							<Form.Control
								className='mb-3'
								type='password'
								value={password}
								placeholder='Enter password'
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							{/* code added here to display validation error */}
							{passwordErr && <p> {passwordErr} </p>}
						</Form.Group>
						<Button
							className='loginButton'
							variant='dark'
							size='lg'
							type='submit'
							onClick={handleSubmit}
						>
							Login
						</Button>
					</Form>
					<Card.Subtitle className='mt-4 text-muted text-left'>
					<p>	New user ? Register account below.</p>
					</Card.Subtitle>
					<Link to={`/register`}>
						<Button className='registerButton' variant='dark' size='lg'>
							Register
						</Button>
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
