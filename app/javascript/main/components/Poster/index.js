// src/components/Poster/index.jsx

import React from 'react'
import { Link } from 'react-router-dom'

// Components
import PosterControls from './components/PosterControls'

const renderControls = (props) => {
  if (props.hoverItem !== props.slideItem) return <span></span>

  return(
    <PosterControls
      movie={props.movie}
      hoverItem={props.hoverItem}
      slideItem={props.slideItem}
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

export default Poster
