// app/javascript/carousel/components/Slide.jsx

import React from 'react'

const Slide = (props) => {
  const active = props.index === 0 ? 'active' : ''

  const movie = props.movie

  const slide = movie.logo.replace('logo.png', 'slide')

  return(
    <div className={`carousel-item ${active} ${slide}`}>
      <div className="slide-info d-none d-sm-block">
        <img src={movie.logo} className="img-fluid movie-logo"/>

        <div className="movie-content">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-rating">{movie.rated}</span>
          <span className="movie-length">{movie.runTime}</span>

          <p className="blurb">{movie.plot}</p>

          <div className="slide-buttons">
            <a href={movie.url} className="btn-blue" id="play">
              <i className="fa fa-play"></i>PLAY
            </a>
            <a href="#" className="btn-clear">
              <i className="fa fa-plus"></i>MY LIST
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slide
