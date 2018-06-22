// app/javascript/movies/components/GenreSlidersContainer.jsx

import React, { Component } from 'react';

import { GenreSliderRow } from './GenreSliderRow';

export class GenreSlidersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: this.props.genres,
      movies: this.props.movies,
      moviesIndex: null
    };

    this.buildMoviesIndex = this.buildMoviesIndex.bind(this);
  }

  buildMoviesIndex() {
    const genres = this.state.genres;
    const movies = this.state.movies;
    const moviesIndex = {};

    for (let genre of genres) {
      moviesIndex[genre.name] = [];

      for (let movie of movies) {
        if (movie.genre_ids.includes(genre.id)) {
          moviesIndex[genre.name].push(movie);
        }
      }
    }

    this.setState({
      moviesIndex: moviesIndex
    });
  }

  componentDidMount() {
    const movies = this.state.movies;

    if (movies && movies.length > 0) {
      this.buildMoviesIndex();
    }

    console.log('GenreSlidersContainer mounted');
    console.log(this.state);
  }

  componentDidUpdate() {
    console.log('GenreSlidersContainer updated.');
    console.log(this.state);
  }

  render() {
    const genres = this.state.genres;
    const moviesIndex = this.state.moviesIndex;

    if (moviesIndex) {
      return(
        <div className='genre-sliders-container'>
          {
            genres.map((genre) =>
              <GenreSliderRow
                key={genre.id}
                genre={genre}
                movies={this.state.moviesIndex[genre.name]} />
            )
          }
        </div>
      );
    } else {
      return(
        <div className='genre-sliders-container'></div>
      );
    }
  }
}
