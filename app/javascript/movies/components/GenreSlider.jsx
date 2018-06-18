// app/javascript/movies/components/GenreSlider.jsx

import React from 'react';

import Slide from './Slide';

export class GenreSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genre: this.props.genre,
      movies: this.props.movies,
      movie_ids: this.props.movie_ids,
      slideLength: this.props.slideLength,
      moviesArray: [],
      moviesMatrix: []
    };

    this.buildMoviesArray = this.buildMoviesArray.bind(this);
    this.buildMoviesMatrix = this.buildMoviesMatrix.bind(this);
  }

  buildMoviesArray(genre) {
    let array = [];

    for (let id of this.state.movie_ids) {
      array.push(this.state.movies[id]);
    }

    this.setState({
      moviesArray: array
    });
  }

  buildMoviesMatrix(array) {
    let matrix = [];
    let i = 0;
    let m = 0;

    while (i < array.length) {
      matrix[m] = [];
      let j = 0;
      while (j < this.state.slideLength) {
        matrix[m].push(array[i]);
        j++;
        i++;
      }
      m++;
    }

    this.setState({
      moviesMatrix: matrix
    });
  }

  componentDidMount() {
    const genre = this.state.genre;
    const self = this;

    const prom = new Promise((resolve) => {
      resolve(self.buildMoviesArray(genre));
    });

    prom.then(function() {
      self.buildMoviesMatrix(self.state.moviesArray);
    });

    console.log('GenreSlider mounted');
    console.log(this.state);
  }

  render() {
    const genre = this.state.genre;
    const matrix = this.state.moviesMatrix;

    if (matrix && matrix.length > 0) {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          {
            matrix.map((item, index) =>
              <Slide key={index} movies={item} />
            )
          }
          <span className='handle handleNext active'>
            <b className='indicator-icon icon-rightCaret'>
              <i className='fa fa-angle-right'></i>
            </b>
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}
