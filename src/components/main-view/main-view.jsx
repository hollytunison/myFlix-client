import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
//import { MovieCard } from '../movie-card/movie-card';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';

import './main-view.scss';

class MainView extends React.Component {
	constructor() {
    super();
    this.state = {
      user: null,
    };
  }

	componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

	getMovies(token) {
		axios
			.get('https://mysterious-plains-19334.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.props.setMovies(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	/* When a user successfully logs in, this function updates the `user`
  property in state to that *particular user*/
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
		let { movies } = this.props;
		let { user } = this.state;

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
						<span className='brand-name'>my80's VICE</span>
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

				<Container className='mainview-container'>
					<Row className='justify-content-md-center'>
						<Route
							exact
							path='/'
							render={() => {
								if (!user)
									return (
										<Col>
											<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
										</Col>
									);

								// Before the movies have been loaded
								if (movies.length === 0) return <div className='main-view' />;

								return <MoviesList movies={movies} />;
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
											<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
										</Col>
									);

								if (movies.length === 0) return <div className='main-view' />;
								return (
									<Col md={8}>
										<MovieView
											movie={movies.find((m) => m._id === match.params.movieId)}
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
											<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
										</Col>
									);

								if (movies.length === 0) return <div className='main-view' />;
								return (
									<Col md={8}>
										<DirectorView onBackClick={() => history.goBack()} />
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
											<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
										</Col>
									);

								if (movies.length === 0) return <div className='main-view' />;
								return (
									<Col md={8}>
										<GenreView onBackClick={() => history.goBack()} />
									</Col>
								);
							}}
						/>
					</Row>
				</Container>
			</Router>
		);
	}
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
