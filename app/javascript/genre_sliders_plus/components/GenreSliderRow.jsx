// app/javascript/genre_sliders_plus/components/GenreSliderRow.jsx

import React, { Component } from 'react';

import LinkedList from '../structures/doubly_linked_list/LinkedList';
// import { GenreSlider } from './GenreSlider';

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

  render() {
    const moviesList = this.state.moviesList;

    if (moviesList) {
      const genre = this.state.genre;
      const movies = this.state.movies;
      const slideLength = this.state.slideLength;

      return (
        <div id={`${genre.name}_row`} className='genre-slider-row'>
          <h2 className='rowHeader'>
            <a className='rowTitle' href={`/genres/${genre.id}`}>
              <div className='row-header-title'>{genre.name}</div>
            </a>
          </h2>

          {/* <GenreSlider
            genre={genre}
            movies={movies}
            slideLength={slideLength} /> */}
        </div>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    if (this.state.moviesList === null) {
      this.buildMoviesList();
    }

    console.log('GenreSliderRow mounted');
  }

  buildMoviesList() {
    const movies = this.state.movies;
    const slideLength = this.state.slideLength;
    const last = movies.length - 1;
    const list = new LinkedList();
    let i = 1;
    let j = 1;
    let arr = [];

    for (let movie of movies) {
      arr.push(movie);
      j++;

      if (i < slideLength && j < last) {
        i++;

      } else if (j === last) {
        list.add(arr);

      } else {
        list.add(arr);
        arr = [];
        i = 1;
      }
    }

    this.setState({
      moviesList: list
    });
  }

  componentDidUpdate() {
    console.log('GenreSliderRow updated');
    console.log(this.state);
  }
}

export default GenreSliderRow;
