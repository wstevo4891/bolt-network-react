// PosterControls/components/MovieInfo.jsx

import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@components'

import MovieTitle from './MovieTitle'

const MovieInfo = ({ movie }) => (
  <div className="movie-info">
    <div>
      <span className="play-icon">
        <Icon icon="fa-play" />
      </span>
    </div>

    <div>
      <MovieTitle title={movie.title} />
    </div>

    <div>
      <span className="rating">{movie.rating}</span>
      <span>{movie.runtime} min</span>
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
