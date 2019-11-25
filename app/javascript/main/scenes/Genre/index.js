// Genre Scene

import React from 'react'

import Results from '../../components/Results'

const Genre = (props) => {
  const genre = props.genresIndex[props.genreSlug].text

  const movies = props.moviesIndex[genre]

  return (
    <div className="display-container">
      <div className="row">
        <div className="col-12 mb-4">
          <h1 style={{ color: 'white' }}>{genre}</h1>
        </div>
      </div>

      <Results
        movies={movies}
        slideLength={props.slideLength}
      />
    </div>
  )
}

export default Genre
