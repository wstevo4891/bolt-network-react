// app/javascript/quotes/components/App.jsx
import React from 'react';
import axios from 'axios';
import { GenreSlidersContainer } from './GenreSlidersContainer';

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genres: null,
      movies: null
    };

    this.fetchGenres = this.fetchGenres.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  fetchGenres() {
    axios.get(`api/genres`)
      .then(response => {
        localStorage.setItem('Genres', JSON.stringify(response.data));
        this.setState({ genres: response.data });
      })
      .catch(error => {
        console.error(error);
      })
  }

  fetchMovies() {
    axios.get(`api/movies`)
      .then(response => {
        localStorage.setItem('Movies', JSON.stringify(response.data));
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.error(error);
      })
  }

  componentWillMount() {
    const genresData = localStorage.getItem('Genres');
    const moviesData = localStorage.getItem('Movies');
    if (genresData && moviesData) {
      this.setState({
        genres: JSON.parse(genresData),
        movies: JSON.parse(moviesData)
      });
      return;
    }
    this.fetchGenres();
    this.fetchMovies();
  }

  // componentDidMount() {
  //   console.log('App mounted!');
  //   console.log(this.state);
  // }

  render () {
    let genres = this.state.genres;

    return (
      <GenreSlidersContainer
        genres={this.state.genres}
        movies={this.state.movies} />
    );
  }
}
