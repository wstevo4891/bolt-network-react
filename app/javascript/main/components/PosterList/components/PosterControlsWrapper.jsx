import React from 'react'
import PropTypes from 'prop-types'

import PosterControls from './PosterControls'

const PosterControlsWrapper = (props) => {
  if (props.hoverItem !== props.slideItem) return <span></span>

  return(
    <PosterControls
      movie={props.movie}
      hoverItem={props.hoverItem}
      slideItem={props.slideItem}
    />
  )
}

PosterControlsWrapper.propTypes = {
  movie: PropTypes.object.isRequired,
  hoverItem: PropTypes.number.isRequired,
  slideItem: PropTypes.number.isRequired
}

export default PosterControlsWrapper
