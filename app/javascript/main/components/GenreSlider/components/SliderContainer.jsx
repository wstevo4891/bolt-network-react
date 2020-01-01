// app/javascript/main/scenes/Home/GenreSliders/components/SliderContent.jsx

import React from 'react'
import PropTypes from 'prop-types'

// Services
import TranslateCalculator from '../services/TranslateCalculator'

// Components
import PosterList from '@components/PosterList'

const SliderContainer = (props) => {

  const { slides, slideLength, start, next, prev } = props

  const transformStyle = new TranslateCalculator(
    slideLength, start, next, prev
  ).call()

  return(
    <div className="slider-container">
      <div
        className={`sliderContent ${next || prev ? 'animating' : ''}`}
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

SliderContainer.propTypes = {
  slides: PropTypes.array,
  slideLength: PropTypes.number,
  start: PropTypes.bool,
  next: PropTypes.bool,
  prev: PropTypes.bool
}

export default SliderContainer
