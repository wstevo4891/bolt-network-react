import React from 'react'
import PropTypes from 'prop-types'

// Services
import { TranslateCalculator } from '../services'

// Components
import PosterList from '@components/PosterList'

const SlidesContainer = (props) => {
  const { slides, slideLength, start, next, prev } = props

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
          type="slider"
          movies={slides}
          slideLength={slideLength}
          start={start}
        />
      </div>
    </div>
  )
}

SlidesContainer.propTypes = {
  slides: PropTypes.array,
  slideLength: PropTypes.number,
  start: PropTypes.bool,
  next: PropTypes.bool,
  prev: PropTypes.bool
}

export default SlidesContainer
