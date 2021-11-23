import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";


import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            Description: null,
            Movies: null
        };
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }
    
      /*When a movie is clicked, this function is invoked and updates the state of
  the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  /* When a user successfully logs in, this function updates the `user`
  property in state to that *particular user*/
  onLoggedIn(authData) {
     console.log(authData);
     this.setState({
       user: authData.user.Username
     });
  
     localStorage.setItem('token', authData.token);
     localStorage.setItem('user', authData.user.Username);
     this.getMovies(authData.token);
   }

  getMovies(token) {
    axios.get('https://mysterious-plains-19334.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logging out');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    /* If there is no user, the LoginView is rendered. If there is a user
    logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

    // Before the movies have been loaded
    if (movies.length === 0) return (<div className="main-view" />);

    return (
      <div className="main-view">
              <Navbar bg="navColor" variant="dark" expand="lg" >
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
                  {selectedMovie
                    ? (
                      <Row xs={1} md={2} className="g-4">
                         <Col sm={8}>
                          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                      </Row>
                    )
                    : (
                      <Row xs={1} md={2} className="g-4">
                        { movies.map(movie => (
                          <Col>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                          </Col>
                          ))
                        }
                      </Row>
                    )  
                  }
                </Container>
              </div>
               
           
    );

  }

}