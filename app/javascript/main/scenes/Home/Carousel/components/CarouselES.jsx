// app/javascript/main/scenes/Home/Carousel/components/Carousel.jsx

import React, { Component } from 'react'
import { Carousel, CarouselItem } from 'reactstrap'

// Services
import API from '../../../../services/API'
import MyListService from '../../../services/MyListService'

// Components
import SlideES from './SlideES'
import ControlButton from './ControlButton'

export default class CarouselES extends Component {
  state = {
    activeIndex: 0,
    titles: [
      'Pirates of the Caribbean: The Curse of the Black Pearl',
      'The Avengers',
      'Skyfall'
    ],
    movies: null
  }

  render() {
    const { activeIndex, movies } = this.state

    if (movies === null) return null

    const slides = this.buildSlides(movies)

    return(
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval={false}
      >
        {slides}

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

  buildSlides = (movies) => {
    return movies.map((movie) => {
      return(
        <CarouselItem
          key={movie.logo}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <SlideES
            movie={movie}
            addToList={this.addToList}
          />
        </CarouselItem>
      )
    })
  }

  onExiting = () => {
    this.animating = true
  }

  onExited = () => {
    this.animating = false
  }

  next = () => {
    if (this.animating) return

    const { activeIndex, movies } = this.state

    const nextIndex = activeIndex === movies.length - 1 ? 0 : activeIndex + 1

    this.setState({ activeIndex: nextIndex })
  }

  previous = () => {
    if (this.animating) return

    const { activeIndex, movies } = this.state

    const nextIndex = activeIndex === 0 ? movies.length - 1 : activeIndex - 1

    this.setState({ activeIndex: nextIndex })
  }

  componentDidMount() {
    const moviesData = localStorage.getItem('CarouselMovies')

    if (moviesData) {
      this.setState({
        movies: JSON.parse(moviesData)
      })
    } else {
      this.fetchMovies()
    }
  }

  fetchMovies = () => {
    API.movies.search(this.state.titles)
      .then(response => {
        localStorage.setItem('CarouselMovies', JSON.stringify(response.data))

        this.setState({
          movies: response.data
        })
      })
      .catch(error => {
        console.error('Error in Carousel.fetchMovies')
        console.error(error)
      })
  }

  addToList = (event, movieId) => {
    event.preventDefault()
    event.stopPropagation()

    return new MyListService(movieId).add()
  }
}
