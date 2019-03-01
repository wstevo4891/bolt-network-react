// app/javascript/main/scenes/Home/GenreSliders/components/GenreSlidersContainer.jsx

import React, { Component } from 'react'

// Services
import API from '../../../../services/API'

// Components
import GenreSliderRow from './GenreSliderRow'

export default class GenreSlidersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideLength: this.props.slideLength,
      genres: this.props.genres,
      moviesIndex: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const { slideLength } = this.state

    if (nextProps.slideLength === slideLength) return

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
      this.fetchMoviesIndex(slideLength)
    }
  }

  fetchMoviesIndex = (slideLength) => {
    API.moviesIndex.get(slideLength)
      .then(response => {
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
