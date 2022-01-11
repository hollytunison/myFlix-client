import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './director-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const DirectorView = () => {
	const [director, setDirector] = useState({});

	let { Name } = useParams();
	useEffect(() => {
		console.log('working');
		const token = localStorage.getItem('token');
		axios
			.get('https://mysterious-plains-19334.herokuapp.com/directors/' + Name, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assigns the result to the state
				console.log(response.data);
				setDirector(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);
	return (
		<Container className='directorContainer'>
			<Row>
				<Col>
					<div className='director-view'>
						<div className='director-name'>
							<span className='name'>Name: </span>
							<span className='value'>{director.Name}</span>
						</div>

						<div className='director-bio'>
							<span className='bio'>Bio: </span>
							<span className='value'>{director.Bio}</span>
						</div>

						<div className='director-birth'>
							<span className='birth'>Birth: </span>
							<span className='value'>{director.Birth}</span>
						</div>

						<Link to='/'>
							<Button className='ml-auto btn btn-dark'>Back to Movies</Button>
						</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default DirectorView;