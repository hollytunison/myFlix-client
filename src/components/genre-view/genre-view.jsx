import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './genre-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
	constructor() {
		super();
		this.state = {
			genre: null,
		};
	}

	componentDidMount() {
		const accessToken = localStorage.getItem('token');
		this.getGenre(accessToken);
}

getGenre(token) {
		const { genre } = this.props;
		axios.get(`https://mysterious-plains-19334.herokuapp.com/genres/${genre.Name}`, {
				headers: { Authorization: `Bearer ${token}` }
		})
				.then((response) => {
						this.setState({
								Description: response.data.Description,
								Movies: response.data.Movies,
						});
				})
				.catch(function (error) {
						console.log(error);
				})
}

render() {
	const { genre , onBackClick } = this.props;

	return (
		<Container className='genreContainer'>
			<Row>
				<Col>
					<div className='genre-view'>
						<div className='genre-name'>
							<span className='name'>Name:</span>
							<span className='value'>{genre.Name}</span>
						</div>

						<div className='genre-description'>
							<span className='description'>Description:</span>
							<span className='value'>{genre.Description}</span>
						</div>

						<div className='genre-button-div'>
							<Button
								className='genre-button'
								variant='secondary'
								className='mt-3'
								onClick={() => {
									onBackClick(null);
								}}
							>
								Back
							</Button>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
}

GenreView.propTypes = {
movie: PropTypes.shape({
	Genre: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
	}).isRequired,
}),
};