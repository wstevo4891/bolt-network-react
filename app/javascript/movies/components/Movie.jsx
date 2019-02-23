// app/javascript/movies/components/Movie.jsx

import React from 'react'

const Movie = (props) => {
  const movie = props.movie
  const actors = movie.actors.join(', ')

  let directors = movie.directors

  if (directors.length === 1) {
    directors = directors.join('')
  } else {
    directors = directors.join(', ')
  }

  return(
    <div className="row">
      <div className="col-4">
        <img src={movie.poster} className="img-fluid" />
      </div>

      <div className="col-8 movie-info">
        <p><span>Year: </span>{movie.year}</p>
        <p><span>Rated: </span>{movie.rated}</p>
        <p><span>Runtime: </span>{movie.run_time}</p>
        <p><span>Release Date: </span>{movie.release_date}</p>
        <p><span>Director: </span>{directors}</p>
        <p><span>Actors: </span>{actors}</p>
        <p>
          <span>Plot: </span>
          <span className="movie-plot">{movie.plot}</span>
        </p>
      </div>
    </div>
  )
}

export default Movie
