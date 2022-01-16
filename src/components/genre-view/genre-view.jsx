import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import './genre-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

	const GenreView =() => {

		const [genre,setGenre]=useState({});
		

		let {Name} = useParams();
		useEffect(()=>{

			const token =localStorage.getItem('token');
			axios
			.get('https://mysterious-plains-19334.herokuapp.com/genres/'+Name, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assigns the result to the state
				setGenre(response.data)
				console.log(response.data)
			})
			.catch(function (error) {
				console.log(error);
			});
			

		},[])
		return (
			<Container className="genreContainer">
        <Row>
          <Col>
            <div className="genreLayout">
              <div className="genre-name">
                <span className="name">Name: </span>
                <span className="value">{genre.Name}</span>
              </div>

              <div className="genre-description">
                <span className="description">Description: </span>
                <span className="value">{genre.Description}</span>
              </div>

              <Link to='/'>
              <Button className='ml-auto btn btn-dark'>
                Back to Movies
              </Button>
              </Link>
              
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

export default GenreView;