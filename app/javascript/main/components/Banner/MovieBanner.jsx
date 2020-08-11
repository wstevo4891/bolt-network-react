// MovieBanner UI Component

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import Icon from '../Icon'
import ToggleListButton from '../ToggleListButton'

function BannerImage(movie) {
  this.backgroundImage = `url(${movie.banner.url})`
  this.backgroundRepeat = 'no-repeat'
  this.backgroundPosition = 'center'
  this.backgroundSize = 'cover'
  this.height = '100%'
}

const MovieBanner = ({ movie }) => {
  const bannerImage = new BannerImage(movie)

  return(
    <div className="banner">
      <div style={bannerImage}>
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
                <Icon icon="fa-play" />PLAY
              </Link>

              <ToggleListButton
                buttonProps={{
                  buttonClass: 'btn-clear',
                }}
                listName="MyList"
                options={['fa-check', 'fa-plus']}
                movie={movie}
                text="MY LIST"
              />
            </div>
          </div>
        </div>
        <div className="poster-overlay"></div>
      </div>
    </div>
  )
}

MovieBanner.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieBanner
