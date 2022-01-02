import React from 'react';
//importing axios library to fetch movies from database
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './main-view.scss';

//importing the login view into the main-view
import { LoginView } from '../login-view/login-view';
//importing the movie-card into the main-view
import { MovieCard } from '../movie-card/movie-card';
//importing the movie-view into the main-view
import { MovieView } from '../movie-view/movie-view';
//importing the profile-view into the main-view
import { ProfileView } from '../profile-view/profile-view';
//importing the director-view into the main-view
import { DirectorView } from '../director-view/director-view';
//importing the director-view into the main-view
import { GenreView } from '../genre-view/genre-view';
//importing the registration view into the main-view
import { RegistrationView } from '../registration-view/registration-view';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
<<<<<<< HEAD
			selectedMovie: null,
=======
>>>>>>> routing
			user: null,
		};
	}

<<<<<<< HEAD
	componentDidMount() {
		axios
			.get('https://mysterious-plains-19334.herokuapp.com/movies')
			.then((response) => {
=======
	getMovies(token) {
		axios
			.get('https://mysterious-plains-19334.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assigns the result to the state
>>>>>>> routing
				this.setState({
					movies: response.data,
				});
			})
<<<<<<< HEAD
			.catch((error) => {
=======
			.catch(function (error) {
>>>>>>> routing
				console.log(error);
			});
	}

<<<<<<< HEAD
	/*When a movie is clicked, this function is invoked and updates the state of
  the `selectedMovie` *property to that movie*/
	setSelectedMovie(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}

	//When a user successfully registers
	onRegistration(register) {
		this.setState({
			register,
		});
=======
	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
>>>>>>> routing
	}

	/* When a user successfully logs in, this function updates the `user`
  property in state to that *particular user*/
<<<<<<< HEAD
	onLoggedIn(user) {
		this.setState({
			user,
		});
	}

	render() {
		const { movies, selectedMovie, user, register } = this.state;

		// if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

		/* If there is no user, the LoginView is rendered. If there is a user
    logged in, the user details are *passed as a prop to the LoginView*/
		if (!user)
			return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		// Before the movies have been loaded
		if (movies.length === 0) return <div className="main-view" />;

		return (
			<div className="main-view">
				<Navbar bg="navColor" variant="dark" expand="lg">
					<Container fluid>
						<Navbar.Brand href="#movies">Back to the 80's</Navbar.Brand>
						<Nav className="justify-content-end">
							<Nav.Link href="#movies">Movies</Nav.Link>
							<Nav.Link href="#user">Profile</Nav.Link>
							<Nav.Link href="#logout">Logout</Nav.Link>
						</Nav>
					</Container>
				</Navbar>

				<Container className="card-container">
					{selectedMovie ? (
						<Row xs={1} md={2} className="g-4">
							<Col sm={8}>
								<MovieView
									movie={selectedMovie}
									onBackClick={(newSelectedMovie) => {
										this.setSelectedMovie(newSelectedMovie);
									}}
								/>
							</Col>
						</Row>
					) : (
						<Row xs={1} md={2} className="g-4">
							{movies.map((movie) => (
								<Col>
									<MovieCard
										key={movie._id}
										movie={movie}
										onMovieClick={(newSelectedMovie) => {
											this.setSelectedMovie(newSelectedMovie);
										}}
									/>
								</Col>
							))}
						</Row>
					)}
				</Container>
			</div>
=======
	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
	}

	render() {
		const { movies, user } = this.state;

		return (
			<Router>
				<Navbar
					fixed='top'
					className='mainnav py-3 py-lg-4'
					bg='navColor'
					variant='dark'
					expand='md'
				>
					<Navbar.Brand href='/'>
						<span className='brand-name'>My 80s Vice</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<Nav.Link href='/'>Movies</Nav.Link>
							<Nav.Link href='/users/:username'>Profile</Nav.Link>
							<Nav.Link
								href='/'
								onClick={() => {
									this.onLoggedOut();
								}}
							>
								Logout
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<div>
					<Container>
						<Row className='justify-content-md-center'>
							<Route
								exact
								path='/'
								render={() => {
									if (!user)
										return (
											<Col>
												<LoginView
													onLoggedIn={(user) => this.onLoggedIn(user)}
												/>
											</Col>
										);

									// Before the movies have been loaded
									if (movies.length === 0) return <div className='main-view' />;
									return movies.map((m) => (
										<Col sm={6} md={4} lg={4} key={m._id}>
											<MovieCard movie={m} />
										</Col>
									));
								}}
							/>

							<Route
								path='/register'
								render={() => {
									if (user) return <Redirect to='/' />;
									return (
										<Col>
											<RegistrationView />
										</Col>
									);
								}}
							/>

							<Route
								path='/users/:username'
								render={({ history }) => {
									if (!user)
										return (
											<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
										);

									if (movies.length === 0)
										return <div className='main-view'></div>;

									return (
										<ProfileView
											movies={movies}
											user={user}
											onBackClick={() => history.goBack()}
										/>
									);
								}}
							/>

							<Route
								path='/movies/:movieId'
								render={({ match, history }) => {
									if (!user)
										return (
											<Col>
												<LoginView
													onLoggedIn={(user) => this.onLoggedIn(user)}
												/>
											</Col>
										);

									if (movies.length === 0) return <div className='main-view' />;
									return (
										<Col md={8}>
											<MovieView
												movie={movies.find(
													(m) => m._id === match.params.movieId
												)}
												onBackClick={() => history.goBack()}
											/>
										</Col>
									);
								}}
							/>

							<Route
								path='/directors/:Name'
								render={({ match, history }) => {
									if (!user)
										return (
											<Col>
												<LoginView
													onLoggedIn={(user) => this.onLoggedIn(user)}
												/>
											</Col>
										);

									if (movies.length === 0) return <div className='main-view' />;
									return (
										<Col md={8}>
											<DirectorView
												director={
													movies.find(
														(m) => m.Director.Name === match.params.name
													).Director
												}
												onBackClick={() => history.goBack()}
											/>
										</Col>
									);
								}}
							/>

							<Route
								path='/genres/:Name'
								render={({ match, history }) => {
									if (!user)
										return (
											<Col>
												<LoginView
													onLoggedIn={(user) => this.onLoggedIn(user)}
												/>
											</Col>
										);

									if (movies.length === 0) return <div className='main-view' />;
									return (
										<Col md={8}>
											<GenreView
												genre={
													movies.find((m) => m.Genre.Name === match.params.name)
														.Genre
												}
												onBackClick={() => history.goBack()}
											/>
										</Col>
									);
								}}
							/>
						</Row>
					</Container>
				</div>
			</Router>
>>>>>>> routing
		);
	}
}
