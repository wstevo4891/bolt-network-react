import React from 'react'
import PropTypes from 'prop-types'

import {
  DisplayContainer,
  Results,
  TitleRow,
} from '@components'

const Genre = (props) => {
  const genre = props.genresIndex[props.genreSlug].text

  const movies = props.moviesIndex[genre]

  return (
    <DisplayContainer>
      <TitleRow title={genre} />
      <Results
        movies={movies}
        name={genre}
        slideLength={props.slideLength}
      />
    </DisplayContainer>
  )
}

Genre.propTypes = {
  genresIndex: PropTypes.object.isRequired,
  genreSlug: PropTypes.string.isRequired,
  moviesIndex: PropTypes.object.isRequired,
  slideLength: PropTypes.number.isRequired,
}

export default Genre
