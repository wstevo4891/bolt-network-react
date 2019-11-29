// app/javascript/carousel/components/Slide.jsx

import React from 'react'
import { Link } from 'react-router-dom'

// Components
import MyListButton from '../../MyListButton'

const Slide = (props) => {
  const movie = props.movie

  // const slide = movie.logo.replace('logo.png', 'slide')

  const slideImage = {
    backgroundImage: `url(${movie.banner.url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%'
  }

  return(
    <div style={slideImage}>
      <div className="slide-info d-none d-sm-block">
        <img
          src={movie.logo.url}
          className="img-fluid movie-logo"
          alt="Movie logo"
        />

        <div className="movie-content">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-rating">{movie.rated}</span>
          <span className="movie-length">{movie.run_time}</span>

          <p className="blurb">{movie.plot}</p>

          <div className="slide-buttons">
            <Link to={movie.url} className="btn-blue" id="play">
              <i className="fa fa-play"></i>PLAY
            </Link>

            <MyListButton movie={movie} type="banner" />
          </div>
        </div>
      </div>
      <div className="poster-overlay"></div>
    </div>
  )
}

export default Slide
