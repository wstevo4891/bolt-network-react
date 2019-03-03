// app/javascript/main/scenes/Home/GenreSliders/components/GenreSlidersContainer.jsx

import React, { Component } from 'react'

// Services
import API from '../../../../services/API'

// Components
import GenreSliderRow from './GenreSliderRow'

export default class GenreSlidersContainer extends Component {
  state = {
    slideLength: this.props.slideLength,
    genres: this.props.genres,
    moviesIndex: null
  }

  componentWillReceiveProps(nextProps) {
    let slideLength = this.state.slideLength

    if (nextProps.slideLength === slideLength) return

    slideLength = nextProps.slideLength

    let moviesIndex = localStorage.getItem(`MoviesIndex_${slideLength}`)

    if (moviesIndex === null) {
      this.fetchMoviesIndex(slideLength)

    } else {
      this.setState({
        slideLength: slideLength,
        moviesIndex: JSON.parse(moviesIndex)
      })
    }
  }

  render() {
    const { slideLength, genres, moviesIndex } = this.state

    if (moviesIndex === null) return null

    return(
      <div className='genre-sliders-container'>
        {
          genres.map((genre, index) =>
            <GenreSliderRow
              key={index}
              genre={genre}
              movies={moviesIndex[genre.name]}
              slideLength={slideLength}
            />
          )
        }
      </div>
    );
  }

  componentDidMount() {
    let { slideLength, moviesIndex } = this.state

    if (moviesIndex !== null) return

    moviesIndex = localStorage.getItem(`MoviesIndex_${slideLength}`)

    if (moviesIndex === null) {
      this.fetchMoviesIndex(slideLength)

    } else {
      this.setState({
        moviesIndex: JSON.parse(moviesIndex)
      })
    }
  }

  fetchMoviesIndex = (slideLength) => {
    API.moviesIndex.get(slideLength)
      .then(response => {
        localStorage.setItem(`MoviesIndex_${slideLength}`, JSON.stringify(response.data))

        this.setState({
          slideLength: slideLength,
          moviesIndex: response.data
        });
      })
      .catch(error => {
        console.error('Error in GenreSlidersContainer.fetchMoviesIndex()')
        console.error(error)
      })
  }
}
