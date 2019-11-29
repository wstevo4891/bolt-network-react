// app/javascript/main/scenes/Home/GenreSliders/components/GenreSlider.jsx

import React, { Component } from 'react'

import SlidesArray from '../services/SlidesArray'

import PaginationList from './PaginationList'
import SliderArrow from './SliderArrow'
import SliderContainer from './SliderContainer'

export default class Slider extends Component {
  state = {
    position: 1,
    start: true,
    next: false,
    prev: false
  }

  render() {
    const { genre, moviesList, slideLength } = this.props
    const { position, start, next, prev } = this.state

    const slides = new SlidesArray({ start, moviesList, position }).call()

    return (
      <div id={`${genre.title}_slider`} className='genre-slider'>
        <PaginationList
          position={position}
          listLength={moviesList._length}
        />

        <SliderArrow
          start={start}
          direction='Prev'
          icon='left'
          handleClick={this.handleArrowClick}
        />

        <SliderContainer
          slides={slides}
          slideLength={slideLength}
          next={next}
          prev={prev}
          start={start}
        />

        <SliderArrow
          direction='Next'
          icon='right'
          handleClick={this.handleArrowClick}
        />
      </div>
    )
  }

  handleArrowClick = (direction) => {
    const key = direction.toLowerCase()
    const root = document.getElementById('root')

    root.style['pointer-events'] = 'none'

    this.setState({
      [key]: true
    })

    setTimeout(() => {
      this.handleTransitionEnd()
      root.style['pointer-events'] = 'auto'
    }, 1000)
  }

  handleTransitionEnd = () => {
    const position = this.determinePosition()

    this.setState({
      position: position,
      start: false,
      next: false,
      prev: false
    })
  }

  determinePosition = () => {
    const { next, prev, position } = this.state

    if (next) {
      return this.nextPosition(position)
    } else if (prev) {
      return this.prevPosition(position)
    }
  }

  nextPosition = (position) => {
    const listLength = this.props.moviesList._length

    if (position === listLength) {
      return 1
    } else {
      return position + 1
    }
  }

  prevPosition = (position) => {
    const listLength = this.props.moviesList._length

    if (position === 1) {
      return listLength
    } else {
      return position - 1
    }
  }
}
