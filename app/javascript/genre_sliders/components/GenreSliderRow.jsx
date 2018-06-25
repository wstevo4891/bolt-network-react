// app/javascript/movies/components/GenreSliderRow.jsx

import React, { Component } from 'react';

import { GenreSlider } from './GenreSlider';

export class GenreSliderRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      genre: this.props.genre,
      movies: this.props.movies,
      slideLength: null
    };

    this.slideLengths = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    };

    this.breakpoints = [1400, 1100, 800, 500];

    this.updateSlideLength = this.updateSlideLength.bind(this);
  }

  updateSlideLength() {
    console.log('updateSlideLength called!');
    console.log(JSON.stringify(this.breakpoints));
    let width = window.innerWidth;
    console.log('width: ' + width);
    let num = null;

    for (let point of this.breakpoints) {
      if (width >= point) {
        num = this.slideLengths[point];
        break;
      }
    }

    if (num == null) {
      num = 2;
    }

    console.log('slideLength: ' + num);

    this.setState({
      slideLength: num
    });
  }

  render() {
    const genre = this.state.genre;
    const movies = this.state.movies;
    const slideLength = this.state.slideLength;

    if (movies && movies.length > 0) {
      return (
        <div id={`${genre.name}_row`} className='genre-slider-row'>
          <h2 className='rowHeader'>
            <a className='rowTitle' href={genre.url}>
              <div className='row-header-title'>{genre.name}</div>
            </a>
          </h2>

          <GenreSlider
            genre={genre}
            movies={movies}
            slideLength={slideLength} />
        </div>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    if (this.state.slideLength === null) {
      this.updateSlideLength();
    }

    window.addEventListener("resize", this.updateSlideLength.bind(this));

    console.log('GenreSliderRow mounted');
  }

  componentDidUpdate() {
    console.log('GenreSliderRow updated');
    console.log(this.state);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSlideLength.bind(this));
  }
}
