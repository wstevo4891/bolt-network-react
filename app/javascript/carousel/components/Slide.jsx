// app/javascript/carousel/components/Slide.jsx

import React from 'react'

const Slide = (props) => (
  <div className="carousel-item active pirates-slide">
    <div className="slide-info">
      <img src={props.movie.logo} className="img-fluid movie-logo"/>

      <div className="movie-content">
        <span className="movie-year">{props.movie.year}</span>
        <span className="movie-rating">{props.movie.rated}</span>
        <span className="movie-length">{props.movie.runTime}</span>

        <p className="blurb">{props.movie.plot}</p>

        <div className="slide-buttons">
          <a href={props.movie.url} className="btn-blue" id="play">
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

export default Slide
