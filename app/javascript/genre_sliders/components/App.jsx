// app/javascript/movies/components/App.jsx

import React, { Component } from 'react';
import axios from 'axios';

import { GenreSlidersContainer } from './GenreSlidersContainer';

export class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      genres: [],
      movies: []
    };

    this.fetchGenres = this.fetchGenres.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
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

  fetchMovies() {
    axios.get('/api/movies')
      .then(response => {
        localStorage.setItem('Movies', JSON.stringify(response.data));

        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  componentDidMount() {
    const genresData = localStorage.getItem('Genres');
    const moviesData = localStorage.getItem('Movies');

    if (genresData) {
      this.setState({
        genres: JSON.parse(genresData)
      });
    } else {
      this.fetchGenres();
    }

    if (moviesData) {
      this.setState({
        movies: JSON.parse(moviesData)
      });
    } else {
      this.fetchMovies();
    }

    console.log('App mounted!');
  }

  componentDidUpdate() {
    console.log('App updated');
    console.log(this.state);
  }

  render () {
    const movies = this.state.movies;

    if (movies && movies.length > 0) {
      return (
        <GenreSlidersContainer
          genres={this.state.genres}
          movies={this.state.movies} />
      );
    } else {
      return null;
    }
  }
}
