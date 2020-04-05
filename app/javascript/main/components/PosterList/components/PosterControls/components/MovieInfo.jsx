// PosterControls/components/MovieInfo.jsx

import React from 'react'
import PropTypes from 'prop-types'

import MovieTitle from './MovieTitle'

const MovieInfo = ({ movie }) => (
  <div className="movie-info">
    <div>
      <span className="play-icon">
        <i className="fa fa-play"></i>
      </span>
    </div>

    <div>
      <MovieTitle title={movie.title} />
    </div>

    <div>
      <span className="rating">{movie.rated}</span>
      <span>{movie.run_time}</span>
    </div>
    
    <div>
      <p>{movie.genres.join(', ')}</p>
    </div>
  </div>
)

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieInfo
