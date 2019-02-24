// app/javascript/main/scenes/Home/Carousel/components/Carousel.jsx

import React, { Component } from 'react'

import API from '../../../../services/API'
import Slide from './Slide'

export default class Carousel extends Component {
  constructor() {
    super()
    this.state = {
      titles: [
        'Pirates of the Caribbean: The Curse of the Black Pearl',
        'The Avengers',
        'Skyfall'
      ],
      movies: []
    }
  }

  render() {
    const movies = this.state.movies

    return(
      <div id="carouselMain" className="carousel slide carousel-fade" data-ride="false">
        <div className="carousel-inner">
          {movies.map((movie, index) =>
            <Slide key={index} index={index} movie={movie} />
          )}
        </div>

        <a className="carousel-control-prev" href="#carouselMain" role="button" data-slide="prev">
          <span className="fa fa-angle-left slider-arrow slider-prev">
            <p className="sr-only">Go to next slide</p>
          </span>
        </a>

        <a className="carousel-control-next" href="#carouselMain" role="button" data-slide="next">
          <span className="fa fa-angle-right slider-arrow slider-next">
            <p className="sr-only">Go to previous slide</p>
          </span>
        </a>
      </div>
    )
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

    // Turn off carousel's auto-sliding
    const $carousel = $('.carousel')

    $('.carousel-control-prev').click(function() {
      $carousel.carousel('pause')
    })

    $('.carousel-control-next').click(function() {
      $carousel.carousel('pause')
    })
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
}
