// Movie Scene stateful component

import React, { Component } from 'react'

import MoviePage from './MoviePage'

export default class Movie extends Component {
  state = {
    movie: null
  }

  render() {
    const movie = this.state.movie

    if (movie === null) return null

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>{movie.title}</h1>
          </div>
        </div>

        <MoviePage movie={movie} />
      </div>
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
