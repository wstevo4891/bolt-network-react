// app/javascript/genre_sliders_plus/components/GenreSliderRow.jsx

import React, { Component } from 'react';

import * as actions from '../actions/buildMoviesList';
import GenreSlider from './GenreSlider';

class GenreSliderRow extends Component {
  constructor (props) {
    super(props);

    this.state = {
      genre: this.props.genre,
      movies: this.props.movies,
      slideLength: this.props.slideLength,
      moviesList: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slideLength === this.state.slideLength) return;

    const moviesList = actions.buildMoviesList(nextProps);

    this.setState({
      slideLength: nextProps.slideLength,
      moviesList: moviesList
    });
  }

  render() {
    const moviesList = this.state.moviesList;

    if (moviesList === null) return null;

    const genre = this.state.genre;
    const slideLength = this.state.slideLength;

    return (
      <div id={`${genre.name}_row`} className='genre-slider-row'>
        <h2 className='rowHeader'>
          <a className='rowTitle' href={`/genres/${genre.id}`}>
            <div className='row-header-title'>{genre.name}</div>
          </a>
        </h2>

        <GenreSlider
          genre={genre}
          moviesList={moviesList}
          slideLength={slideLength} />
      </div>
    );
  }

  componentDidMount() {
    if (this.state.moviesList === null) {
      const moviesList = actions.buildMoviesList(this.state);

      this.setState({
        moviesList: moviesList
      });
    }
  }
}

export default GenreSliderRow;
