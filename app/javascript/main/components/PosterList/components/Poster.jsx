// src/components/Poster/index.jsx

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import PosterControls from './PosterControls'

const renderControls = (params) => {
  if (params.hoverItem !== params.slideItem) return <span></span>

  return(
    <PosterControls
      movie={params.movie}
      hoverItem={params.hoverItem}
      slideItem={params.slideItem}
    />
  )
}

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

    {renderControls(props)}
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
