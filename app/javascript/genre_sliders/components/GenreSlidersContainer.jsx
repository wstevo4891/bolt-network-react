// app/javascript/genre_sliders_plus/components/GenreSlidersContainer.jsx

import React, { Component } from 'react';
import axios from 'axios';

import GenreSliderRow from './GenreSliderRow';

class GenreSlidersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: null,
      moviesIndex: null,
      slideLength: props.slideLength ? props.slideLength : null
    };

    this.slideLengthIndex = {
      1400: 6,
      1100: 5,
      800: 4,
      500: 3
    };

    this.breakpoints = [1400, 1100, 800, 500];
  }

  render() {
    const { slideLength, genres, moviesIndex } = this.state;

    if (slideLength === null) return null;

    return(
      <div className='genre-sliders-container'>
        {
          genres.map((genre, index) =>
            <GenreSliderRow
              key={index}
              genre={genre}
              movies={moviesIndex[genre.name]}
              slideLength={slideLength}
            />
          )
        }
      </div>
    );
  }

  componentDidMount() {
    const genresData = localStorage.getItem('Genres');
    const indexData = localStorage.getItem('MoviesIndex');

    console.log('MoviesIndex: ' + indexData);

    if (genresData) {
      this.setState({
        genres: JSON.parse(genresData)
      });
    } else {
      this.fetchGenres();
    }

    if (indexData) {
      this.setState({
        moviesIndex: JSON.parse(indexData)
      });
    } else {
      this.fetchMoviesIndex();
    }

    if (this.state.slideLength === null) {
      this.updateSlideLength();
      window.addEventListener("resize", this.updateSlideLength.bind(this));
    }
  }

  fetchMoviesIndex = () => {
    axios.get('/api/movies-index')
      .then(response => {
        localStorage.setItem('MoviesIndex', JSON.stringify(response.data));

        console.log('MoviesIndex: ' + JSON.stringify(response.data));

        this.setState({
          moviesIndex: response.data
        });
      })
      .catch(error => {
        console.error(error);
      })
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

  updateSlideLength = () => {
    console.log('updateSlideLength called!');
    let width = window.innerWidth;
    let num = null;

    for (let point of this.breakpoints) {
      if (width >= point) {
        num = this.slideLengthIndex[point];
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSlideLength.bind(this));
  }
}

export default GenreSlidersContainer;
