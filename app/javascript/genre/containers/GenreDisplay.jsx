// app/javascript/genre/containers/GenreDisplay.jsx

import React, { Component } from 'react'
import axios from 'axios'

import PosterRow from '../../main/components/PosterRow'

export default class GenreDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      genre: null,
      movies: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const genreId = nextProps.match.params.genreId

    this.fetchGenre(genreId)
  }

  render() {
    const { slideLength, genre, movies } = this.state

    if (genre === null) return null

    const slides = this.buildSlides(movies, slideLength)

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>{genre.name}</h1>
          </div>
        </div>

        <div id="genres-row" className="row">
          {this.renderSlides(slides, slideLength)}
        </div>
      </div>
    )
  }

  componentDidMount() {
    const genreId = this.props.match.params.genreId

    this.fetchGenre(genreId)
  }

  renderSlides = (slides, slideLength) => {
    return slides.map((slide, index) =>
      <div key={index} className="col-12 search-results-col">
        <PosterRow movies={slide} slideLength={slideLength} />
      </div>
    )
  }

  fetchGenre = (genreId) => {
    axios.get(`/api/genres/${genreId}`)
      .then(response => {
        // localStorage.setItem(`Genre_${genreId}`, JSON.stringify(response.data))

        this.setState({
          genre: response.data.genre,
          movies: response.data.movies
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
}

