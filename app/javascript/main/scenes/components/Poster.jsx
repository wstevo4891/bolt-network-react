// app/javascript/main/scenes/components/Poster.jsx

import React from 'react'
import { Link } from 'react-router-dom'

const Poster = (props) => {
  const movie = props.movie
  console.log(`hoverItem: ${props.hoverItem}`)

  if (typeof movie !== 'object') return null

  const service = new props.service(props)

  const containerClass = service.containerClass()

  const posterStyle = service.posterStyle()

  const posterImage = {
    backgroundImage: `url(${movie.photo.url})`,
    backgroundSize: '100% 100%'
  }

  return (
    <div
      className={containerClass}
      style={posterStyle}
      onMouseOver={props.mouseOver}
      onMouseOut={props.mouseOut}
    >
      <Link to={`/movies/${movie.id}`}>
        <div className='poster' style={posterImage}></div>
      </Link>
    </div>
  )
}

export default Poster;
