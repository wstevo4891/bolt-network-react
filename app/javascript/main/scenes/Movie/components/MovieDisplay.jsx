// app/javascript/main/scenes/Movie/components/MovieDisplay.jsx

import React, { Component } from 'react'

import API from '../../../services/API'
import Movie from './Movie'

export default class MovieDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      movie: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const movieId = nextProps.match.params.movieId

    this.fetchMovie(movieId)
  }

  render() {
    const { slideLength, movie } = this.state

    if (movie === null) return null

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>{movie.title}</h1>
          </div>
        </div>

        <Movie movie={movie} />
      </div>
    )
  }

  componentDidMount() {
    const movie = this.state.movie

    if (movie !== null) return

    const movieId = this.props.match.params.movieId

    this.fetchMovie(movieId)
  }

  fetchMovie = (movieId) => {
    API.movies.show(movieId)
      .then(response => {
        console.log(response.data)
        // localStorage.setItem(`Movie_${movieId}`, JSON.stringify(response.data))

        this.setState({
          movie: response.data
        })
      })
      .catch(error => {
        console.error('Error in MovieDisplay.fetchMovie()')
        console.error(error)
      })
  }
}
