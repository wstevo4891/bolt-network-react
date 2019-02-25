// app/javascript/main/scenes/Recent/components/RecentlyAdded.jsx

import React, { Component } from 'react'

import API from '../../../services/API'
import Results from '../../components/Results'

export default class RecentlyAdded extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      movies: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const slideLength = this.state.slideLength

    if (nextProps.slideLength === slideLength) return

    this.setState({
      slideLength: nextProps.slideLength
    })
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
    const movies = this.state.movies

    if (movies !== null) return

    this.fetchMovies()
  }

  fetchMovies = () => {
    API.movies.recent()
      .then(response => {
        // localStorage.setItem('RecentlyAdded', JSON.stringify(response.data))

        this.setState({
          movies: response.data
        })
      })
      .catch(error => {
        console.error('Error in RecentlyAdded.fetchMovies()')
        console.error(error)
      })
  }
}
