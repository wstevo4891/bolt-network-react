// app/javascript/carousel/containers/Carousel.jsx

import React, { Component } from 'react'

import Slide from '../components/Slide'

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
            <Slide key={index} movie={movie} />
          )}
        </div>
      </div>
    )
  }

  componentDidMount() {

  }
}
