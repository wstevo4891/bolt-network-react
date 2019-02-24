// app/javascript/main/scenes/Genre/components/GenreDisplay.jsx

import React, { Component } from 'react'
import API from '../../../services/API'

import Results from '../../components/Results'

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

    return(
      <div className="display-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 style={{ color: 'white' }}>{genre.name}</h1>
          </div>
        </div>

        <Results movies={movies} slideLength={slideLength} />
      </div>
    )
  }

  componentDidMount() {
    const genreId = this.props.match.params.genreId

    this.fetchGenre(genreId)
  }

  fetchGenre = (genreId) => {
    API.genres.show(genreId)
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
}

