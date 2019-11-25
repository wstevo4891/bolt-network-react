// app/javascript/main/scenes/Home/Carousel/components/CarouselApp.jsx

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Carousel, CarouselItem } from 'reactstrap'

import './styles/App.scss'

// Components
import Slide from './components/Slide'
import ControlButton from './components/ControlButton'

import { fetchCarouselMovies } from './actions/carouselMoviesActions'

class CarouselApp extends Component {
  state = {
    activeIndex: 0,
    titles: [
      'Pirates of the Caribbean: The Curse of the Black Pearl',
      'The Avengers',
      'Skyfall'
    ]
  }

  render() {
    const movies = this.props.movies

    if (movies === null) return null

    return(
      <Carousel
        activeIndex={this.state.activeIndex}
        next={this.next}
        previous={this.previous}
        interval={false}
      >
        {movies.map(movie =>
          <CarouselItem
            key={movie.id}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
            <Slide movie={movie} />
          </CarouselItem>
        )}

        <ControlButton
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />

        <ControlButton
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    )
  }

  onExiting = () => {
    this.animating = true
  }

  onExited = () => {
    this.animating = false
  }

  next = () => {
    if (this.animating) return

    const activeIndex = this.state.activeIndex
    const movies = this.props.movies
    const nextIndex = activeIndex === movies.length - 1 ? 0 : activeIndex + 1

    this.setState({ activeIndex: nextIndex })
  }

  previous = () => {
    if (this.animating) return

    const activeIndex = this.state.activeIndex
    const movies = this.props.movies
    const nextIndex = activeIndex === 0 ? movies.length - 1 : activeIndex - 1

    this.setState({ activeIndex: nextIndex })
  }

  componentDidMount() {
    if (this.props.movies.length > 0) return

    const titles = this.state.titles

    this.props.dispatch(fetchCarouselMovies(titles))
  }
}

function mapStateToProps(state) {
  return {
    movies: state.carouselMovies.movies
  }
}

export default connect(mapStateToProps)(CarouselApp)
