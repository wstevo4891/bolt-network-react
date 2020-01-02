// app/javascript/main/scenes/Home/GenreSliders/components/GenreSlider.jsx

import React from 'react'
import PropTypes from 'prop-types'

// Components
import RowHeader from './RowHeader'
import PaginationList from './PaginationList'
import SliderArrow from './SliderArrow'
import SlidesContainer from './SlidesContainer'

const Slider = (props) => (
  <div id={`${props.genre}_row`} className='genre-slider-row'>
    <RowHeader genre={props.genre} />

    <div id={`${props.genre}_slider`} className='genre-slider'>
      <PaginationList
        active={props.position - 1}
        listLength={props.listLength}
      />

      <SliderArrow
        start={props.start}
        direction='Prev'
        icon='left'
        handleClick={props.handleClick}
      />

      <SlidesContainer
        slides={props.slides}
        slideLength={props.slideLength}
        next={props.next}
        prev={props.prev}
        start={props.start}
      />

      <SliderArrow
        direction='Next'
        icon='right'
        handleClick={props.handleClick}
      />
    </div>
  </div>
)

Slider.propTypes = {
  genre: PropTypes.string,
  slideLength: PropTypes.number,
  slides: PropTypes.array,
  listLength: PropTypes.number,
  position: PropTypes.number,
  start: PropTypes.bool,
  next: PropTypes.bool,
  prev: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Slider
