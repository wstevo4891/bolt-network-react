import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data Structures
import {
  MoviesList,
  SlidesArray,
} from './structures'

// Components
import { Slider } from './components'

class GenreSlider extends Component {
  constructor(props) {
    super(props)
    this.moviesList = new MoviesList(props.slideLength, props.movies)

    this.state = {
      position: 1,
      start: true,
      next: false,
      prev: false
    }

    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
  }

  get root() {
    return document.getElementById('root')
  }

  render() {
    const { position, start } = this.state
    const slides = new SlidesArray(start, this.moviesList, position)

    return(
      <Slider
        {...this.props}
        {...this.state}
        slides={slides}
        listLength={this.moviesList._length}
        handlePrevClick={this.handlePrevClick}
        handleNextClick={this.handleNextClick}
      />
    )
  }

  handlePrevClick() {
    this.handleArrowClick('prev')
  }

  handleNextClick() {
    this.handleArrowClick('next')
  }

  handleArrowClick(direction) {
    this.root.style['pointer-events'] = 'none'

    this.setState({ [direction]: true })

    setTimeout(() => {
      this.handleTransitionEnd()
      this.root.style['pointer-events'] = 'auto'
    }, 1000)
  }

  handleTransitionEnd() {
    const { next, prev, position } = this.state
    const nextPosition = this.moviesList.calcPosition(next, prev, position)

    this.setState({
      position: nextPosition,
      start: false,
      next: false,
      prev: false
    })
  }

  componentDidUpdate(prevProps) {
    const { slideLength, movies } = this.props
    if (prevProps.slideLength === slideLength) return

    this.moviesList = new MoviesList(slideLength, movies)
  }
}

GenreSlider.propTypes = {
  genre: PropTypes.string,
  movies: PropTypes.array,
  slideLength: PropTypes.number
}

export default GenreSlider
