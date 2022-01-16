import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../filter/filter';

import '../main-view/main-view.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view">No movies</div>

  return <div className="movies">
    <div className="filter-section">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </div>
    <div className="filtered-movies">
      {filteredMovies.map(m => (
        <div key={m._id}>
          <MovieCard movie={m} />
        </div>
      ))}
    </div>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);