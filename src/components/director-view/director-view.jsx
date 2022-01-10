import React,{useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './director-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';



	const DirectorView =()=>{

		const [director,setDirector]=useState({});

		let {Name} = useParams();
		useEffect(()=>{

			const token =localStorage.getItem('token');
			axios
			.get('https://mysterious-plains-19334.herokuapp.com/directors/'+Name, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assigns the result to the state
				setDirector(response.data)
				console.log(response.data)
			})
			.catch(function (error) {
				console.log(error);
			});
			

		},[])
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
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}



export default DirectorView;
// DirectorView.propTypes = {
// 	movie: PropTypes.shape({
// 		Director: PropTypes.shape({
// 			Name: PropTypes.string.isRequired,
// 			Bio: PropTypes.string.isRequired,
// 			Birth: PropTypes.number.isRequired,
// 		}).isRequired,
// 	}),
// };
