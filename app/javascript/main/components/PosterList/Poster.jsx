import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import PosterControlsWrapper from './PosterControlsWrapper'

const Poster = (props) => {
  const {
    containerData: {
      className,
      hoverStyle,
      slideItem,
    },
    hoverItem,
    mouseOver,
    mouseLeave,
    movie,
    posterImage,
  } = props

  return (
    <div
      className={className}
      style={hoverStyle}
      onMouseOver={(e) => mouseOver(e, slideItem)}
      onMouseLeave={mouseLeave}
    >
      <Link to={movie.url}>
        <div className="poster" style={posterImage}></div>
        <div className="poster-overlay"></div>
      </Link>
  
      <PosterControlsWrapper
        movie={movie}
        hoverItem={hoverItem}
        slideItem={slideItem}
      />
    </div>
  )
}

Poster.propTypes = {
  containerData: PropTypes.shape({
    className: PropTypes.string,
    hoverStyle: PropTypes.object,
    slideItem: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  hoverItem: PropTypes.number,
  mouseOver: PropTypes.func,
  mouseLeave: PropTypes.func,
  movie: PropTypes.object,
  posterImage: PropTypes.object,
}

export default Poster
