// app/javascript/main/scenes/components/MovieInfo.jsx

import React from 'react'

function renderTitle(title) {
  if (title.length > 40) {
    return title.substring(0, 40) + '...'
  } else {
    return title
  }
}

function renderGenres(genres) {
  if (genres.length > 1) {
    return genres.join(', ')
  } else {
    return genres.join('')
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
      <p>{renderGenres(movie.genres)}</p>
    </div>
  </div>
)

export default MovieInfo
