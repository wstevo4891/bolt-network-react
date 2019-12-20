// PosterControls/components/MovieInfo.jsx

import React from 'react'
import PropTypes from 'prop-types'

function renderTitle(title) {
  if (title.length > 40) {
    return title.substring(0, 40) + '...'
  } else {
    return title
  }
}

const MovieInfo = ({ movie }) => (
  <div className="movie-info">
    <div>
      <span className="play-icon">
        <i className="fa fa-play"></i>
      </span>
    </div>

    <div>
      <h3>{renderTitle(movie.title)}</h3>
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
  movie: PropTypes.object
}

export default MovieInfo
