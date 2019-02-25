// app/javascript/carousel/components/Slide.jsx

import React from 'react'
import { Link } from 'react-router-dom'

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
          <span className="movie-length">{movie.run_time}</span>

          <p className="blurb">{movie.plot}</p>

          <div className="slide-buttons">
            <Link to={movie.url} className="btn-blue" id="play">
              <i className="fa fa-play"></i>PLAY
            </Link>

            <a
              href="#"
              className="btn-clear"
              onClick={(event) => props.addToList(event, movie.id)}
            >
              <i className="fa fa-plus"></i>MY LIST
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slide
