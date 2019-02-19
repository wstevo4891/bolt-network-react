// app/javascript/movies/components/Poster.jsx

import React from 'react'

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
    <a href={`/movies/${movie.id}`}>
      <div
        className={containerClass}
        style={posterStyle}
        onMouseOver={props.mouseOver}
        onMouseOut={props.mouseOut}
      >
        <div className='poster' style={posterImage}></div>
      </div>
    </a>
  )
}

export default Poster;
