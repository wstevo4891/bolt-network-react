// Movie Scene stateful component

import React, { Component } from 'react'

import { DisplayContainer, TitleRow } from '@components'

import MoviePage from './MoviePage'

export default class Movie extends Component {
  state = {
    movie: null
  }

  render() {
    const movie = this.state.movie
    if (movie === null) return null

    return (
      <DisplayContainer>
        <TitleRow title={movie.title} />
        <MoviePage movie={movie} />
      </DisplayContainer>
    )
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.movieID)
  }

  fetchMovie = async (movieID) => {
    try {
      const response = await fetch(`/api/movies/${movieID}`)
      const data = await response.json()

      this.setState({
        movie: data
      })

    } catch(error) {
      console.error('Error in Movie.fetchMovie()')
      console.error(error)
    }
  }
}
