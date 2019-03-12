// app/javascript/main/scenes/Home/GenreSliders/components/GenreSlider.jsx

import React, { Component } from 'react'

import PaginationList from './PaginationList'
import SlideBuilder from './SlideBuilder'
import SliderArrow from './SliderArrow'

export default class GenreSlider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      genre: this.props.genre,
      moviesList: this.props.moviesList,
      slideLength: this.props.slideLength,
      position: 1,
      start: true,
      next: false,
      prev: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      slideLength: nextProps.slideLength,
      moviesList: nextProps.moviesList
    })
  }

  render() {
    const { genre, moviesList, slideLength,
            position, start, next, prev } = this.state

    return (
      <div id={`${genre.name}_slider`} className='genre-slider'>
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

        <SlideBuilder
          slideLength={slideLength}
          moviesList={moviesList}
          position={position}
          start={start}
          next={next}
          prev={prev}
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
    const main = document.getElementById('main')

    main.style['pointer-events'] = 'none'

    this.setState({
      [key]: true
    })

    setTimeout(() => {
      this.handleTransitionEnd()
      main.style['pointer-events'] = 'auto'
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
    const listLength = this.state.moviesList._length
    const { next, prev, position } = this.state

    if (next) {
      if (position === listLength) {
        return 1
      } else {
        return position + 1
      }
    } else if (prev) {
      if (position === 1) {
        return listLength
      } else {
        return position - 1
      }
    }
  }
}
