// app/javascript/movies/components/App.jsx

import React from 'react';
import axios from 'axios';

import GenreSlidersContainer from './GenreSlidersContainer';

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genres: [],
      movies: [],
      moviesIndex: null
    };

    this.fetchGenres = this.fetchGenres.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.buildMoviesIndex = this.buildMoviesIndex.bind(this);
  }

  fetchGenres() {
    axios.get('/api/genres')
      .then(response => {
        localStorage.setItem('Genres', JSON.stringify(response.data));
        this.setState({ genres: response.data });
      })
      .catch(error => {
        console.error(error);
      })
  }

  fetchMovies() {
    axios.get('/api/movies')
      .then(response => {
        localStorage.setItem('Movies', JSON.stringify(response.data));

        const moviesIndex = this.buildMoviesIndex(response.data);

        this.setState({
          movies: response.data,
          moviesIndex: moviesIndex
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  buildMoviesIndex(movies) {
    let movies_index = {};

    // for (let movie of movies) {
    //   let id = movie.id;
    //   movies_index[id] = movie;
    // }

    movies.map((movie) =>
      movies_index[movie.id] = movie
    )

    return movies_index;
  }

  componentDidMount() {
    const genresData = localStorage.getItem('Genres');
    const moviesData = localStorage.getItem('Movies');

    if (genresData && moviesData) {
      const movies = JSON.parse(moviesData);
      const moviesIndex = this.buildMoviesIndex(movies);

      this.setState({
        genres: JSON.parse(genresData),
        movies: movies,
        moviesIndex: moviesIndex
      });
    } else {
      this.fetchGenres();
      this.fetchMovies();
    }

    console.log('App mounted!');
    console.log(this.state);
  }

  componentDidUpdate() {
    console.log('App updated');
    console.log(this.state);
  }

  render () {
    return (
      <GenreSlidersContainer
        genres={this.state.genres}
        moviesIndex={this.state.moviesIndex} />
    );
  }
}
