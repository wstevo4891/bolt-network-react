// MoviePage View Component

import React from 'react'

const MoviePage = ({ movie }) => (
  <div className="row">
    <div className="col-4">
      <img
        src={movie.poster}
        className="img-fluid"
        alt={`Poster for ${movie.title}`}
      />
    </div>

    <div className="col-8 movie-display">
      <p><span>Year: </span>{movie.year}</p>

      <p><span>Rated: </span>{movie.rated}</p>

      <p><span>Runtime: </span>{movie.run_time}</p>

      <p><span>Release Date: </span>{movie.release_date}</p>

      <p><span>Genres: </span>{movie.genres.join(', ')}</p>

      <p><span>Director: </span>{movie.directors.join(', ')}</p>

      <p><span>Actors: </span>{movie.actors.join(', ')}</p>

      <p>
        <span>Plot: </span>
        <span className="movie-plot">{movie.plot}</span>
      </p>
    </div>
  </div>
)

export default MoviePage
