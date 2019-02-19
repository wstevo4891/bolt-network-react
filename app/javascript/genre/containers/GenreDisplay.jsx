// app/javascript/genre/containers/GenreDisplay.jsx

import React, { Component } from 'react'
import axios from 'axios'

import PosterRow from '../../main/components/PosterRow'

export default class GenreDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genreId: this.props.genreId,
      slideLength: null,
      movies: null
    }

    this.slideLengthIndex = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    };

    this.breakpoints = [1400, 1100, 800, 500];
  }

  render() {
    const { slideLength, movies } = this.state

    if (slideLength === null || movies === null) return null

    const slides = this.buildSlides(movies, slideLength)

    return(
      <div id="genres-row" className="row">
        {this.renderSlides(slides, slideLength)}
      </div>
    )
  }

  componentDidMount() {
    console.log('GenreDisplay Mounted')
    console.log(this.state)

    const { genreId, movies, slideLength } = this.state

    if (slideLength === null) {
      this.updateSlideLength();
    }

    if (movies === null) {
      this.fetchMovies(genreId)
    }

    window.addEventListener("resize", this.updateSlideLength.bind(this));
  }

  renderSlides = (slides, slideLength) => {
    return slides.map((slide, index) =>
      <div key={index} className="col-12 search-results-col">
        <PosterRow movies={slide} slideLength={slideLength} />
      </div>
    )
  }

  fetchMovies = (genreId) => {
    axios.get(`/api/movies/by-genre/${genreId}`)
      .then(response => {
        // localStorage.setItem(`Movies_For_Genre_${genreId}`, JSON.stringify(response.data))

        this.setState({
          movies: response.data
        })
      })
      .catch(error => {
        console.error('Error in GenreDisplay.fetchMovies()')
        console.error(error)
      })
  }

  buildSlides = (items, limit) => {
    let slides = []
    let counter = 0
    let itemCount = 0
    let arr = []

    for (let item of items) {
      itemCount++

      if (counter < limit && itemCount < items.length) {
        arr.push(item)
        counter++
      } else if (itemCount === items.length) {
        if (arr.length === limit) {
          slides.push(arr)
          slides.push([item])
        } else {
          arr.push(item)
          slides.push(arr)
        }
      } else {
        slides.push(arr)
        counter = 0
        arr = []
      }
    }

    return slides
  }

  updateSlideLength = () => {
    let width = window.innerWidth;
    let num = null;

    for (let point of this.breakpoints) {
      if (width >= point) {
        num = this.slideLengthIndex[point];
        break;
      }
    }

    if (num == null) {
      num = 2;
    }

    console.log('slideLength: ' + num);

    this.setState({
      slideLength: num
    });
  }
}

