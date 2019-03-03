// app/javascript/main/scenes/Home/GenreSliders/components/GenreSliderRow.jsx

import React, { Component } from 'react'

// Services
import MoviesList from '../services/MoviesList'

// Components
import GenreSlider from './GenreSlider'

export default class GenreSliderRow extends Component {
  state = {
    genre: this.props.genre,
    movies: this.props.movies,
    slideLength: this.props.slideLength,
    moviesList: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slideLength === this.state.slideLength) return

    const moviesList = new MoviesList(nextProps).call()

    this.setState({
      slideLength: nextProps.slideLength,
      moviesList: moviesList
    })
  }

  render() {
    const { genre, slideLength, moviesList } = this.state

    if (moviesList === null) return null

    return (
      <div id={`${genre.name}_row`} className='genre-slider-row'>
        <h2 className='rowHeader'>
          <a className='rowTitle' href={`/genres/${genre.id}`}>
            <div className='row-header-title'>{genre.name}</div>
          </a>
        </h2>

        <GenreSlider
          genre={genre}
          moviesList={moviesList}
          slideLength={slideLength}
        />
      </div>
    )
  }

  componentDidMount() {
    let moviesList = this.state.moviesList

    if (moviesList !== null) return

    moviesList = new MoviesList(this.state).call()

    this.setState({
      moviesList: moviesList
    })
  }
}
