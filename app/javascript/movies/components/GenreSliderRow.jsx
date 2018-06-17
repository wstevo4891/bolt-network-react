// app/javascript/movies/components/GenreSliderRow.jsx

import React from 'react';
import axios from 'axios';
import { GenreSlider } from './GenreSlider';

export class GenreSliderRow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      genre: this.props.genre,
      movies: this.props.movies,
      movie_ids: null,
      slideLength: null
    };
    this.slideLengths = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    }
    this.breakpoints = [1400, 1100, 800, 500]

    this.fetchMovieIds = this.fetchMovieIds.bind(this);
    this.updateSlideLength = this.updateSlideLength.bind(this);
  }

  fetchMovieIds(genre) {
    axios.get(`api/genres/${genre.id}/movie_ids`)
      .then(response => {
        localStorage.setItem(`${genre.name}_movie_ids`, JSON.stringify(response.data));
        console.log(`movie_ids: ${response.data}`);
        this.setState(function() {
          this.state.movie_ids = response.data;
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  updateSlideLength() {
    console.log('updateSlideLength called!');
    console.log(JSON.stringify(this.breakpoints));
    let width = window.innerWidth;
    console.log('width: ' + width);
    let num = null;
    for (var point of this.breakpoints) {
      if (width >= point) {
        num = this.slideLengths[point];
        break;
      }
    }
    if (num == null) {
      num = 2;
    }
    console.log('slideLength: ' + num);
    this.setState(function() {
      this.state.slideLength = num;
    });
  }

  componentWillMount() {
    this.updateSlideLength();
    let genre = this.state.genre;
    const movie_ids = localStorage.getItem(`${genre.name}_movie_ids`);
    if (movie_ids) {
      this.setState({ movie_ids: JSON.parse(movie_ids)});
      return;
    }
    this.fetchMovieIds(genre);
    
  }

  componentDidMount() {
    // console.log('GenreSliderRow mounted');
    // console.log(this.state);
    window.addEventListener("resize", this.updateSlideLength.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSlideLength.bind(this));
  }

  render() {
    let genre = this.state.genre;

    return (
      <div id={`${genre.name}_row`} className='genre-slider-row'>
        <h2 className='rowHeader'>
          <a className='rowTitle' href={genre.url}>
            <div className='row-header-title'>{genre.name}</div>
          </a>
        </h2>
        <GenreSlider
          genre={genre}
          movies={this.state.movies}
          movie_ids={this.state.movie_ids}
          slideLength={this.state.slideLength} />
      </div>
    );
  }
}
