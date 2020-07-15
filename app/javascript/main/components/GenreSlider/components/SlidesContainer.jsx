import React from 'react'
import PropTypes from 'prop-types'

// Services
import { TranslateCalculator } from '../services'

// Components
import PosterList from '@components/PosterList'

const SlidesContainer = (props) => {
  const { genre, slides, slideLength, start, next, prev } = props

  const contentClass = `sliderContent${next || prev ? ' animating' : ''}`

  const transformStyle = new TranslateCalculator(
    slideLength, start, next, prev
  ).call()

  return(
    <div className="slider-container">
      <div
        className={contentClass}
        style={transformStyle}
      >
        <PosterList
          movies={slides}
          name={genre}
          slideLength={slideLength}
          start={start}
          type="slider"
        />
      </div>
    </div>
  )
}

SlidesContainer.propTypes = {
  genre: PropTypes.string,
  slides: PropTypes.array,
  slideLength: PropTypes.number,
  start: PropTypes.bool,
  next: PropTypes.bool,
  prev: PropTypes.bool
}

export default SlidesContainer
