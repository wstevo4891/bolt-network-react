// MovieBanner UI Component

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import Icon from '../Icon'
import ToggleListButton from '../ToggleListButton'

const bannerImage = (movie) => ({
  backgroundImage: `url(${movie.banner.url})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100%',
})

const MovieBanner = ({ movie }) => {
  const image = bannerImage(movie)

  return(
    <div className="banner">
      <div style={image}>
        <div className="slide-info d-none d-sm-block">
          <img
            src={movie.logo.url}
            className="img-fluid movie-logo"
            alt="Movie logo"
          />

          <div className="movie-content">
            <span className="movie-year">{movie.year}</span>
            <span className="movie-rating">{movie.rating}</span>
            <span className="movie-length">{movie.runtime}</span>

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
