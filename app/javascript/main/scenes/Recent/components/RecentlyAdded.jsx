// app/javascript/main/scenes/Recent/components/RecentlyAdded.jsx

import React, { Component } from 'react'

import API from '../../../services/API'
import Results from '../../components/Results'

export default class RecentlyAdded extends Component {
  state = {
    slideLength: this.props.slideLength,
    movies: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slideLength === this.state.slideLength) return

    const movies = localStorage.getItem('RecentlyAdded')

    if (movies === null) {
      this.fetchMovies(nextProps.slideLength)

    } else {
      this.setState({
        slideLength: nextProps.slideLength,
        movies: JSON.parse(movies)
      })
    }
  }

  render() {
    const { slideLength, movies } = this.state

    if (movies === null) return null

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>Recently Added</h1>
          </div>
        </div>

        <Results movies={movies} slideLength={slideLength} />
      </div>
    )
  }

  componentDidMount() {
    let { slideLength, movies } = this.state

    if (movies !== null) return

    movies = localStorage.getItem('RecentlyAdded')

    if (movies === null) {
      this.fetchMovies(slideLength)

    } else {
      this.setState({
        movies: JSON.parse(movies)
      })
    }
  }

  fetchMovies = (slideLength) => {
    API.movies.recent()
      .then(response => {
        localStorage.setItem('RecentlyAdded', JSON.stringify(response.data))

        this.setState({
          slideLength: slideLength,
          movies: response.data
        })
      })
      .catch(error => {
        console.error('Error in RecentlyAdded.fetchMovies()')
        console.error(error)
      })
  }
}
