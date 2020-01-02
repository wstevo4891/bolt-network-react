// GenreSlider Functional Component

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Services
import MoviesList from './services/MoviesList'
import PositionCalculator from './services/PositionCalculator'
import SlidesArray from './services/SlidesArray'

// Components
import Slider from './components/Slider'

class GenreSlider extends Component {
  constructor(props) {
    super(props)

    this.moviesList = new MoviesList(props.slideLength, props.movies).call()

    this.calculator = new PositionCalculator(this.moviesList._length)

    this.state = {
      position: 1,
      start: true,
      next: false,
      prev: false
    }

    this.handleArrowClick = this.handleArrowClick.bind(this)
  }

  render() {
    const { position, start } = this.state
    const slides = new SlidesArray(start, this.moviesList, position).call()

    return(
      <Slider
        {...this.props}
        {...this.state}
        slides={slides}
        listLength={this.moviesList._length}
        handleClick={this.handleArrowClick}
      />
    )
  }

  handleArrowClick(direction) {
    const key = direction.toLowerCase()
    const root = document.getElementById('root')

    root.style['pointer-events'] = 'none'

    this.setState({ [key]: true })

    setTimeout(() => {
      this.handleTransitionEnd()
      root.style['pointer-events'] = 'auto'
    }, 1000)
  }

  handleTransitionEnd() {
    const { next, prev, position } = this.state
    const nextPosition = this.calculator.calcPosition(next, prev, position)

    this.setState({
      position: nextPosition,
      start: false,
      next: false,
      prev: false
    })
  }

  componentDidUpdate() {
    const { slideLength, movies } = this.props

    this.moviesList = new MoviesList(slideLength, movies).call()

    this.calculator = new PositionCalculator(this.moviesList._length)
  }
}

GenreSlider.propTypes = {
  genre: PropTypes.string,
  movies: PropTypes.array,
  slideLength: PropTypes.number
}

export default GenreSlider
