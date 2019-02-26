// app/javascript/main/scenes/components/MovieInfo.jsx

import React from 'react'

const MovieInfo = (props) => {
  const movie = props.movie
  let genres = movie.genres

  if (genres.length > 1) {
    genres = genres.join(', ')
  } else {
    genres = genres.join('')
  }

  return(
    <span>
      <div className="movie-info">
        <span className="play-icon">
          <i className="fa fa-play"></i>
        </span>
        <h3>{movie.title}</h3>
        <span className="rating">{movie.rated}</span>
        <span>{movie.run_time}</span>
        <p>{genres}</p>
      </div>
    </span>
  )
}

export default MovieInfo
