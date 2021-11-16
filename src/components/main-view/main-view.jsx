import React from 'react';
//importing axios library to fetch movies from database
import axios from 'axios';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
        axios.get('https://mysterious-plains-19334.herokuapp.com/movies')
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
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
  onLoggedIn(user) {
    this.setState({
      user
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