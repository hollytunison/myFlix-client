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

		axios.post(`https://mysterious-plains-19334.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
				headers: { Authorization: `Bearer ${token}` },
				method: 'POST'
		})
				.then(response => {
						alert(`Added to Favorites List`)
				})
				.catch(function (error) {
						console.log(error);
				});
};

	// getUser(token) {
	// 	const username = localStorage.getItem('user');
	// 	axios
	// 		.get(`https://mysterious-plains-19334.herokuapp.com/genres/${Name}`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		})
	// 		.then((response) => {
	// 			this.setState({
	// 				Username: response.data.Username,
	// 				Password: response.data.Password,
	// 				Email: response.data.Email,
	// 				Birthday: response.data.Birthday,
	// 				FavoriteMovies: response.data.FavoriteMovies,
	// 			});
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// }

	getGenre() {
		//fetch genre from API
		//set state to retrieved genre

	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		
			this.getGenre(accessToken);

	}

	render() {
		const { movie, genre , onBackClick } = this.props;

		return (
			<Container className='moviesContainer'>

				<Row>
					<Col>
						<div className='movie-view'>
							<div className='movie-poster'>
								<img src={movie.ImagePath} alt="movie poster"crossOrigin='true' />
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
								<span className='description'> Description: </span>
								<span className='value'> {movie.Description} </span>
							</div>

							{ this.state.genre && <div className='movie-genre'>
								<span className='genre'> Genre: </span>
								<span className='value'> {movie.Genre.Name} </span>
							</div> }

							<div className='movie-actors'>
								<span className='actors'> Actors: </span>
								<span className='value'> {movie.Actors} </span>
							</div>

							<div className='director-button-div'>
								<Link to={`/directors/${movie.Director.Name}`}>
									<Button className='director-button' bg='dark' variant='dark'>
										Director
									</Button>
								</Link>
							</div>

							<div className='genre-button-div'>
								<Link to={`/genres/${movie.Genre.Name}`}>
									<Button className='genre-button' bg='dark' variant='dark'>
										Genre
									</Button>
								</Link>
							</div>

							<div className='movie-button-div'>
								<Button
									className='movie-button'
									bg='dark'
									variant='dark'
									onClick={() => {
										onBackClick(null);
									}}
								>
									Back
								</Button>
								<Button variant="outline-primary" className="btn-outline-light" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>

							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Year: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Actors: PropTypes.array.isRequired,
		ImagePath: PropTypes.string.isRequired,
	}).isRequired,
};
