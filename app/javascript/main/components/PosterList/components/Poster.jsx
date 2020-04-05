// src/components/Poster/index.jsx

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import PosterControlsWrapper from './PosterControlsWrapper'

const Poster = (props) => (
  <div
    className={props.containerClass}
    style={props.containerStyle}
    onMouseOver={props.mouseOver}
    onMouseLeave={props.mouseLeave}
  >
    <Link to={`/movies/${props.movie.id}`}>
      <div className="poster" style={props.posterImage}></div>
      <div className="poster-overlay"></div>
    </Link>

    <PosterControlsWrapper
      movie={props.movie}
      hoverItem={props.hoverItem}
      slideItem={props.slideItem}
    />
  </div>
)

Poster.propTypes = {
  containerClass: PropTypes.string,
  containerStyle: PropTypes.object,
  mouseOver: PropTypes.func,
  mouseLeave: PropTypes.func,
  movie: PropTypes.object,
  posterImage: PropTypes.object,
  hoverItem: PropTypes.number,
  slideItem: PropTypes.number
}

export default Poster
