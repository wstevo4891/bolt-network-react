// app/javascript/movies/components/SlidersContainer.jsx

import React from 'react';
import { GenreSliderRow } from './GenreSliderRow';

export class GenreSlidersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: this.props.genres,
      movies: this.props.movies,
      moviesObject: null
    }

    this.buildMoviesObject = this.buildMoviesObject.bind(this);
  }

  buildMoviesObject() {
    let movies_object = {};
    this.state.movies.map((movie) =>
      movies_object[movie.id] = movie
    )
    this.setState(function() {
      this.state.moviesObject = movies_object;
    });
  }

  componentWillMount() {
    this.buildMoviesObject();
  }

  // componentDidMount() {
  //   console.log('GenreSliderContainer mounted!');
  //   console.log(this.state);
  // }

  render() {
    let genres = this.state.genres;

    return(
      <div className='genre-sliders-container'>
        {
          genres.map((genre) =>
            <GenreSliderRow key={genre.id} genre={genre} movies={this.state.moviesObject} />
          )
        }
      </div>
    );
  }
}
