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
    if (nextProps.slideLength === this.state.slideLength) return

    this.fetchMoviesIndex(nextProps.slideLength)
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
    const { slideLength, moviesIndex } = this.state

    if (moviesIndex === null) {
      const index = localStorage.getItem('MoviesIndex')

      if (index === null) {
        this.fetchMoviesIndex(slideLength)
      } else {
        this.setState({
          moviesIndex: JSON.parse(index)
        })
      }
    }
  }

  fetchMoviesIndex = (slideLength) => {
    API.moviesIndex.get(slideLength)
      .then(response => {
        localStorage.setItem('MoviesIndex', JSON.stringify(response.data))

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
