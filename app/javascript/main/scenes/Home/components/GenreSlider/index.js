// GenreSlider Functional Component

import React from 'react'

// Services
import MoviesList from './services/MoviesList'

// Components
import Slider from './components/Slider'

const GenreSlider = (props) => {
  if (props.movies === null) return null

  const moviesList = new MoviesList(props).call()

  const { genre, slideLength } = props

  return (
    <div id={`${genre}_row`} className='genre-slider-row'>
      <h2 className='rowHeader'>
        <a className='rowTitle' href={`/genres/${genre.toLowerCase()}`}>
          <div className='row-header-title'>{genre}</div>
        </a>
      </h2>

      <Slider
        genre={genre}
        moviesList={moviesList}
        slideLength={slideLength}
      />
    </div>
  )
}

export default GenreSlider
