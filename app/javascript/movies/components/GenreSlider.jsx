// app/javascript/movies/components/GenreSlider.jsx

import React from 'react';
import { Slide } from './Slide';

export class GenreSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genre: this.props.genre,
      movies: this.props.movies,
      movie_ids: this.props.movie_ids,
      slideLength: this.props.slideLength,
      moviesArray: null
    };

    this.buildMoviesArray = this.buildMoviesArray.bind(this);
    this.buildMoviesMatrix = this.buildMoviesMatrix.bind(this);
  }

  buildMoviesArray(genre) {
    let array = [];
    this.state.movie_ids.map((movie_id) =>
      array.push(this.state.movies[movie_id])
    )
    this.setState(function() {
      this.state.moviesArray = array;
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
    return matrix;
  }

  componentWillMount() {
    let genre = this.state.genre;
    this.buildMoviesArray(genre);
  }

  // componentDidMount() {
  //   console.log('genre slider mounted');
  //   console.log(this.state);
  // }

  render() {
    let genre = this.state.genre;
    let array = this.state.moviesArray;
    let moviesMatrix = this.buildMoviesMatrix(array);

    return (
      <div id={`${genre.name}_slider`} className='genre-slider'>
        {
          moviesMatrix.map((matrix, index) =>
            <Slide key={index} movies={matrix} />
          )
        }
        <span className='handle handleNext active'>
          <b className='indicator-icon icon-rightCaret'>
            <i className='fa fa-angle-right'></i>
          </b>
        </span>
      </div>
    );
  }
}
