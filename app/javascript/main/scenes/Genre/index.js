import React from 'react'
import PropTypes from 'prop-types'

import {
  DisplayContainer,
  Results,
  TitleRow,
} from '@components'

const Genre = ({ genre, movies, slideLength }) => (
  <DisplayContainer>
    <TitleRow title={genre} />
    <Results
      movies={movies}
      name={genre}
      slideLength={slideLength}
    />
  </DisplayContainer>
)

Genre.propTypes = {
  genre: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  slideLength: PropTypes.number.isRequired,
}

export default Genre
