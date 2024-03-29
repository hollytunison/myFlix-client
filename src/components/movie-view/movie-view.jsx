import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './movie-view.scss';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

export class MovieView extends React.Component {
	constructor() {
		super();
		this.state = {
			movie: null,
		};
	}

	addFavoriteMovie() {
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');

		axios
			.post(
				`https://test-myflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
					method: 'POST',
				}
			)
			.then((response) => {
				alert(`Added to Favorites List`);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	getGenre() {
		//fetch genre from API
		//set state to retrieved genre
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');

		this.getGenre(accessToken);
	}

	render() {
		const { movie, genre, onBackClick } = this.props;

		return (
			<div className='movie-div'>
			<Container className='moviesContainer'>
				<Row>
					<Col>
						<div className='movie-view'>
							<div className='movie-poster'>
								<img
									crossOrigin='anonymous'
									src={movie.ImagePath}
									alt='movie poster'
								/>
							</div>

							<div className='movie-title'>
								<span className='title'> Title: </span>
								<span className='value'>{movie.Title}</span>
							</div>

							<div className='movie-year'>
								<span className='year'> Release Year: </span>
								<span className='value'> {movie.Year} </span>
							</div>

							<div className='movie-description'>
								<span className='description'>Description: </span>
								<span className='object'> {movie.Description} </span>
							</div>

							<div className='movie-genre'>
								<span className='genre'> Genre: </span>
								<span className='value'> {movie.Genre.Name} </span>
							</div>

							<div className='movie-actors'>
								<span className='actors'> Actors: </span>
								<span className='value'> {movie.Actors} </span>
							</div>

							<div className='director-button-div'>
								<Link to={`/directors/${movie.Director.Name}`}>
									<Button className='director-button' bg='dark' variant='light'>
										Director
									</Button>
								</Link>
							</div>

							<div className='genre-button-div'>
								<Link to={`/genres/${movie.Genre.Name}`}>
									<Button className='genre-button' bg='dark' variant='light'>
										Genre
									</Button>
								</Link>
							</div>

							<div className='d-grid gap-2'>
								<Button
									variant='light'
									size='lg'
									onClick={() => {
										onBackClick(null);
									}}
								>
									Back to Movies
								</Button>
								<Button
									variant='info'
									size='lg'
									value={movie._id}
									onClick={(e) => this.addFavoriteMovie(e, movie)}
								>
									Add to Favorites
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
			</div>
		);
	}
}

