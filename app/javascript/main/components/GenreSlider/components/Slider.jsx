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
        icon='fa-angle-left'
        handleClick={props.handlePrevClick}
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
        icon='fa-angle-right'
        handleClick={props.handleNextClick}
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
  handlePrevClick: PropTypes.func,
  handleNextClick: PropTypes.func,
}

export default Slider
