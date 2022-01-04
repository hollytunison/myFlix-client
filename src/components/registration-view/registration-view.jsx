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

import './registration-view.scss';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [values, setValues] = useState({
		nameErr: '',
		usernameErr: '',
		passwordErr: '',
		emailErr: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if(isReq){
		axios
			.post('https://mysterious-plains-19334.herokuapp.com/users', {
				Username: username,
				Password: password,
				Email: email,
				Birthday: birthday,
			})
			.then((response) => {
				const data = response.data;
				console.log(data);
				alert('Registration successful, please login!');
				// successful register user, redirect to main view
				window.open('/', '_self'); 
			})
			.catch(response => {
				console.error(response);
				alert('unable to register');
			});
	}
};

	return (
		<Container className='registrationContainer'>
			<Row>
				<Col>
					<CardGroup>
						<Card className='registrationCard'>
							<Card.Body>
								<Card.Title className='text-center'>
									Welcome to My 80 s Vice!
								</Card.Title>
								<Card.Subtitle className='mb-2 text-muted text-center'>Please Register</Card.Subtitle>
							
								<Form>
									<Form.Group>
										<Form.Label> Username </Form.Label>
										<Form.Control
											type='text'
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											placeholder='*required field'
											required
										/>
									</Form.Group>

									<Form.Group>
										<Form.Label> Password </Form.Label>
										<Form.Control
											type='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder='*required field'
											required
										/>
									</Form.Group>

									<Form.Group>
										<Form.Label> Email </Form.Label>
										<Form.Control
											type='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder='*required field'
											required
										/>
									</Form.Group>

									<Form.Group>
										<Form.Label> Birthday </Form.Label>
										<Form.Control
											className='mb-3'
											type='date'
											value={birthday}
											onChange={(e) => setBirthday(e.target.value)}
										/>
									</Form.Group>

									<Link to={`/`}>
            <Button variant='dark' type='submit' onClick={handleSubmit}>Submit</Button>
          </Link>

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
	register: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired
	}),
};
