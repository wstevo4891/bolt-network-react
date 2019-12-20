// app/javascript/main/scenes/Home/GenreSliders/components/SliderContent.jsx

import React from 'react'

// Services
import ContainerStyle from '../services/ContainerStyle'

// Components
import PosterList from '@components/PosterList'

const containerClass = (next, prev) => {
  if (next || prev) {
    return "sliderContent animating"
  } else {
    return "sliderContent"
  }
}

const SliderContainer = (props) => {

  const { slides, slideLength, start, next, prev } = props
  
  const containerStyle = new ContainerStyle(props).call()

  return(
    <div className="slider-container">
      <div
        className={containerClass(next, prev)}
        style={containerStyle}
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

export default SliderContainer
