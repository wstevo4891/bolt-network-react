// MoviePage View Component

import React from 'react'
import PropTypes from 'prop-types'

import DisplayRow from './DisplayRow'
import ListRow from './ListRow'
import ReviewsRow from './ReviewsRow'

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
      <DisplayRow label="Year" value={movie.year} />

      <DisplayRow label="Rating" value={movie.rating} />

      <DisplayRow label="Runtime" value={`${movie.runtime} min`} />

      <DisplayRow label="Release Date" value={movie.release_date} />

      <ListRow
        label={{ singular: 'Genre', plural: 'Genres' }}
        list={movie.genres}
      />

      <ListRow
        label={{ singular: 'Director', plural: 'Directors' }}
        list={movie.directors}
      />

      <ListRow
        label={{ singular: 'Actor', plural: 'Actors' }}
        list={movie.actors}
      />

      <ListRow
        label={{ singular: 'Writer', plural: 'Writers' }}
        list={movie.writers}
      />

      <p style={{ display: 'inline-block' }}>
        <span>Plot: </span>
        <span className="movie-plot">{movie.plot}</span>
      </p>

      <ReviewsRow reviews={movie.reviews} />
    </div>
  </div>
)

const STRING_ARRAY = PropTypes.arrayOf(PropTypes.string)

MoviePage.propTypes = {
  movie: PropTypes.shape({
    actors: STRING_ARRAY,
    directors: STRING_ARRAY,
    genres: STRING_ARRAY,
    plot: PropTypes.string,
    poster: PropTypes.string,
    rating: PropTypes.string,
    release_date: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        source: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    runtime: PropTypes.number,
    title: PropTypes.string,
    writers: STRING_ARRAY,
    year: PropTypes.string,
  }).isRequired,
}

export default MoviePage
