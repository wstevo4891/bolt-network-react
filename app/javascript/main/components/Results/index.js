import React from 'react'
import PropTypes from 'prop-types'

import PosterList from '../PosterList'

export function buildMovieRows(movies, slideLength) {
  const slides = []
  if (movies === null || movies.length === 0) return slides

  let arr
  let i = 0

  while(i < movies.length) {
    arr = movies.slice(i, i += slideLength)
    slides.push(arr)
  }

  return slides
}

export const Results = ({ movies, slideLength }) => {
  const rows = buildMovieRows(movies, slideLength)

  return (
    <div className="row">
      {rows.map((row, index) =>
        <div
          key={`static_slide_${index}`}
          className="col-12"
          style={{ marginBottom: '5.5vw' }}
        >
          <div className="sliderContent">
            <PosterList
              type="static"
              movies={row}
              slideLength={slideLength}
            />
          </div>
        </div>
      )}
    </div>
  )
}

Results.propTypes = {
  movies: PropTypes.array,
  slideLength: PropTypes.number
}
