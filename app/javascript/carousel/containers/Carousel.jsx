// app/javascript/carousel/containers/Carousel.jsx

import React, { Component } from 'react'
import axios from 'axios'

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
    const titles = this.state.titles

    axios.get('/api/movies/search', titles)
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
