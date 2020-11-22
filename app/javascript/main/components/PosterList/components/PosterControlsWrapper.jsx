import React from 'react'
import PropTypes from 'prop-types'

import PosterControls from './PosterControls'

const PosterControlsWrapper = ({ hoverItem, movie, slideItem }) => {
  if (hoverItem !== slideItem) return <span></span>

  return(
    <PosterControls
      movie={movie}
      hoverItem={hoverItem}
      slideItem={slideItem}
    />
  )
}

PosterControlsWrapper.propTypes = {
  movie: PropTypes.object.isRequired,
  slideItem: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  hoverItem: PropTypes.number,
}

PosterControlsWrapper.defaultProps = {
  hoverItem: null,
}

export default PosterControlsWrapper
