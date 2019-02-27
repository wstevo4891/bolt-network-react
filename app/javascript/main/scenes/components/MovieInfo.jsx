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
    <div className="movie-info">
      <div>
        <span className="play-icon">
          <i className="fa fa-play"></i>
        </span>
      </div>

      <div>
        <h3>{movie.title}</h3>
      </div>

      <div>
        <span className="rating">{movie.rated}</span>
        <span>{movie.run_time}</span>
      </div>
      
      <div>
        <p>{genres}</p>
      </div>
    </div>
  )
}

export default MovieInfo
