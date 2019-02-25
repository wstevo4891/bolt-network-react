// app/javascript/main/scenes/Home/GenreSliders/components/SlideBuilder.jsx

import React from 'react'

import SlidesArray from '../services/SlidesArray'
import SliderContainer from './SliderContainer'

const SlideBuilder = (props) => {
  if (props.moviesList === null) return null

  // console.log('Movies List')
  // console.log(props.moviesList)

  const slides = new SlidesArray(props).call()

  return (
    <div className="slider-container">
      <SliderContainer
        slides={slides}
        slideLength={props.slideLength}
        next={props.next}
        prev={props.prev}
        start={props.start}
      />
    </div>
  )
}

export default SlideBuilder
