// app/javascript/genre_sliders_plus/components/GenreSlidersContainer.jsx

import React, { Component } from 'react';
import axios from 'axios';

import GenreSliderRow from './GenreSliderRow';

export default class GenreSlidersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: null,
      moviesIndex: null,
      slideLength: this.props.slideLength
    }
  }

  componentWillReceiveProps(nextProps) {
    const genresData = localStorage.getItem('Genres')

    if (genresData) {
      this.setState({
        genres: JSON.parse(genresData),
        slideLength: nextProps.slideLength
      })
    } else {
      this.setState({
        slideLength: nextProps.slideLength
      })
    }

    this.fetchMoviesIndex(nextProps.slideLength)
  }

  render() {
    const { slideLength, genres, moviesIndex } = this.state;

    if (moviesIndex === null) return null;

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
    const genresData = localStorage.getItem('Genres')

    if (genresData) {
      this.setState({
        genres: JSON.parse(genresData)
      });
    } else {
      this.fetchGenres()
    }

    if (moviesIndex === null) {
      this.fetchMoviesIndex(slideLength)
    }
  }

  fetchMoviesIndex = (slideLength) => {
    axios.get(`/api/movies-index/${slideLength}`)
      .then(response => {
        this.setState({
          moviesIndex: response.data
        });
      })
      .catch(error => {
        console.error('Error in GenreSlidersContainer.fetchMoviesIndex()')
        console.error(error);
      })
  }

  fetchGenres() {
    axios.get('/api/genres')
      .then(response => {
        localStorage.setItem('Genres', JSON.stringify(response.data));

        this.setState({
          genres: response.data
        });
      })
      .catch(error => {
        console.error(error);
      })
  }
}
