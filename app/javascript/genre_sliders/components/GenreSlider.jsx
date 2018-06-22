// app/javascript/movies/components/GenreSlider.jsx

import React, { Component } from 'react';

import { SliderContent } from './SliderContent';
import LinkedList from '../structures/doubly_linked_list/LinkedList';

export class GenreSlider extends Component {
  constructor (props) {
    super(props);

    this.state = {
      genre: this.props.genre,
      movies: this.props.movies,
      slideLength: this.props.slideLength,
      moviesList: null,
      slides: [],
      position: 0,
      start: true,
      sliderStyle: {
        transform: ''
      }
    };

    this.transformations = {
      2: '-150%',
      3: '-133.33333333333334%',
      4: '-125%',
      5: '-120%',
      6: '-116.66666666666667%'
    }

    this.buildMoviesList = this.buildMoviesList.bind(this);
    this.buildSlides = this.buildSlides.bind(this);
    this.renderSlides = this.renderSlides.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  buildMoviesList(nextProps) {
    const movies = nextProps.movies;
    const last = movies.length - 1;
    const slideLength = nextProps.slideLength;
    const list = new LinkedList();
    let i = 0;
    let j = 0;
    let arr = []

    for (let movie of movies) {
      arr.push(movie);
      j++;

      if (i < slideLength && j < last) {
        i++;
      } else if (j === last) {
        list.add(arr);
      } else {
        list.add(arr);
        arr = [];
        i = 0;
      }
    }

    return list;
  }

  buildSlides(list) {
    // const list = this.state.moviesList;
    const position = this.state.position;
    let slides;

    if (position === 0) {
      slides = list.tail.data;
      slides = slides.concat(list.head.data);
      slides = slides.concat(list.head.next.data);

    } else if (position === list._length) {
      slides = list.tail.data;
      slides = slides.concat(list.head.data);
      slides = slides.concat(list.head.next.data);

    } else {
      const current = list.searchNodeAt(position);
      slides = current.previous.data;
      slides = slides.concat(current.data);
      slides = slides.concat(current.next.data);
    }

    return slides;
  }

  renderSlides(list) {
    let slides;

    if (this.state.start) {
      // const list = this.state.moviesList;
      slides = list.head.data;
      slides = slides.concat(list.head.next.data);

    } else {
      slides = this.buildSlides(list);
    }

    return slides;
  }

  handleNext() {}

  handlePrev() {}

  componentDidMount() {
    console.log('GenreSlider mounted');
  }

  componentDidUpdate() {
    console.log('GenreSlider updated');
    console.log(this.state);
  }

  componentWillReceiveProps(nextProps) {
    // const matrix = this.buildMoviesMatrix(nextProps);
    const self = this;
    let list;
    let slides;
    const promOne = new Promise(function(resolve) {
      resolve(list = self.buildMoviesList(nextProps));
    });
    const promTwo = new Promise(function(resolve) {
      resolve(slides = self.renderSlides(list));
    });
    promOne.then(function() {
      promTwo.then(function() {
        self.setState({
          slideLength: nextProps.slideLength,
          // moviesMatrix: matrix,
          moviesList: list,
          slides: slides
        });
      });
    });

    // const list = this.buildMoviesList(nextProps);
    // const slides = this.renderSlides(list);
  }

  render() {
    const genre = this.state.genre;
    const slides = this.state.slides;

    if (slides.length > 0) {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          <SliderContent
            slides={slides}
            slideLength={this.state.slideLength}
            start={this.state.start} />
          
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
