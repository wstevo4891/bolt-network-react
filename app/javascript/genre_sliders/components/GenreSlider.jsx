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
      position: 1,
      start: true,
      next: false,
      prev: false
    };

    this.transformations = {
      2: -150,
      3: -133.33333333333334,
      4: -125,
      5: -120,
      6: -116.66666666666667
    }

    this.buildMoviesList = this.buildMoviesList.bind(this);
    this.buildSlides = this.buildSlides.bind(this);
    this.renderSlides = this.renderSlides.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  buildMoviesList(nextProps) {
    const movies = nextProps.movies;
    const slideLength = nextProps.slideLength;
    const last = movies.length - 1;
    const list = new LinkedList();
    let i = 1;
    let j = 1;
    let arr = [];

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
        i = 1;
      }
    }

    return list;
  }

  buildSlides(list) {
    const position = this.state.position;
    const slideLength = this.state.slideLength;
    let slides = [];

    if (position === 1) {
      slides.push(list.tail.previous.last());
      slides = slides.concat(list.tail.data);
      slides = slides.concat(list.head.data);
      slides = slides.concat(list.head.next.data);
      slides.push(list.head.next.next.data[0]);

    } else if (position === list._length) {
      slides.push(list.tail.previous.previous.last());
      slides = slides.concat(list.tail.previous.data);
      slides = slides.concat(list.tail.data);
      slides = slides.concat(list.head.data);
      slides.push(list.head.next.data[0]);

    } else {
      const current = list.searchNodeAt(position);
      if (position === 2) {
        slides.push(list.tail.last());
      } else {
        slides.push(current.previous.previous.last());
      }

      slides = slides.concat(current.previous.data);
      slides = slides.concat(current.data);
      slides = slides.concat(current.next.data);

      if (position === list._length - 1) {
        slides.push(list.head.data[0]);
      } else {
        slides.push(current.next.next.data[0]);
      }
    }

    return slides;
  }

  renderSlides() {
    const list = this.state.moviesList;
    let slides;

    if (list) {
      if (this.state.start) {
        slides = list.head.data;
        slides = slides.concat(list.head.next.data);
        slides.push(list.head.next.next.data[0]);
  
      } else {
        slides = this.buildSlides(list);
      }
  
      return slides;
    } else {
      return [];
    }
  }

  handleNext() {
    this.setState({
      next: true
    });
    const self = this;

    // Experiment ===============
    // const genre = this.state.genre;
    // const slideLength = this.state.slideLength;
    // let sliderContent;
    // let translateX;

    // if (this.state.start) {
    //   sliderContent = document.getElementById(`${genre.name}_slider`).children[0];
    //   translateX = -100;
    // } else {
    //   sliderContent = document.getElementById(`${genre.name}_slider`).children[1];
    //   translateX = this.transformations[slideLength] - 100;
    // }

    // console.log('TRANSLATE X: ' + translateX);

    // sliderContent.setAttribute('style', `transform: translate3d(${translateX}%, 0px, 0px`);
    // Experiment ===============

    setTimeout(function() {
      const listLength = self.state.moviesList._length;
      let position = self.state.position;

      if (position === listLength) {
        position = 1;
      } else {
        position++;
      }

      self.setState({
        position: position,
        start: false,
        next: false
      });
    }, 1000);

    // const self = this;

    // setTimeout(function() {
    //   // const genre = this.state.genre;
    //   const listLength = self.state.moviesList._length;
    //   // const slideOver = 'transform: translate3d(-100%, 0px, 0px)';
    //   // const parent = document.getElementById(`${genre.name}_slider`);
    //   // const target = parent.find('.sliderContent');
    //   let position = self.state.position;

    //   if (position === listLength) {
    //     position = 1;
    //   } else {
    //     position++;
    //   }

    //   // target.setAttribute('style', slideOver);
    //   self.setState({
    //     position: position,
    //     start: false,
    //     next: false
    //   });
    // }, 1000);
  }

  handlePrev() {
    this.setState({
      prev: true
    });

    const self = this;

    setTimeout(function() {
      // const genre = this.state.genre;
      const listLength = self.state.moviesList._length;
      // const slideOver = 'transform: translate3d(-100%, 0px, 0px)';
      // const parent = document.getElementById(`${genre.name}_slider`);
      // const target = parent.find('.sliderContent');
      let position = self.state.position;

      if (position === 1) {
        position = listLength;
      } else {
        position--;
      }

      // target.setAttribute('style', slideOver);
      self.setState({
        position: position,
        start: false,
        prev: false
      });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    let list;
    // let slides;
    const promOne = new Promise(function(resolve) {
      resolve(list = self.buildMoviesList(nextProps));
    });
    // const promTwo = new Promise(function(resolve) {
    //   resolve(slides = self.renderSlides(list));
    // });

    if (this.state.moviesList === null || nextProps.slideLength !== this.state.slideLength) {
      promOne.then(function() {
        self.setState({
          slideLength: nextProps.slideLength,
          moviesList: list
        });
      });
    }

    // const list = this.buildMoviesList(nextProps);
    // const slides = this.renderSlides(list);
  }

  render() {
    const genre = this.state.genre;
    const list = this.state.moviesList;
    // const slides = this.state.slides;
    const slides = this.renderSlides(list);

    if (slides.length > 0 && this.state.start) {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          <SliderContent
            slides={slides}
            slideLength={this.state.slideLength}
            next={this.state.next}
            prev={this.state.prev}
            start={this.state.start} />
          
          <span className='handle handleNext active'>
            <b className='indicator-icon icon-rightCaret'>
              <i className='fa fa-angle-right' onClick={this.handleNext}></i>
            </b>
          </span>
        </div>
      );

    } else if (slides.length > 0) {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          <span className='handle handlePrev active'>
            <b className='indicator-icon icon-rightCaret'>
              <i className='fa fa-angle-left' onClick={this.handlePrev}></i>
            </b>
          </span>

          <SliderContent
            slides={slides}
            slideLength={this.state.slideLength}
            next={this.state.next}
            prev={this.state.prev}
            start={this.state.start} />
          
          <span className='handle handleNext active'>
            <b className='indicator-icon icon-rightCaret'>
              <i className='fa fa-angle-right' onClick={this.handleNext}></i>
            </b>
          </span>
        </div>
      );

    } else {
      return null;
    }
  }

  componentDidMount() {
    console.log('GenreSlider mounted');
  }

  componentDidUpdate() {
    console.log('GenreSlider updated');
    console.log(this.state);
  }
}
