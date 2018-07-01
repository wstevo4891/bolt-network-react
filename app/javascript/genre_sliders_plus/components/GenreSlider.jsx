// app/javascript/genre_sliders_plus/components/GenreSlider.jsx

import React, { Component } from 'react';
import 'babel-polyfill';

import SlideBuilder from './SlideBuilder';
import * as actions from '../actions/whichTransitionEvent';

class GenreSlider extends Component {
  constructor (props) {
    super(props);

    this.state = {
      genre: this.props.genre,
      moviesList: this.props.moviesList,
      slideLength: this.props.slideLength,
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      slideLength: nextProps.slideLength,
      moviesList: nextProps.moviesList
    });
  }

  render() {
    const genre = this.state.genre;

    if (this.state.start) {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          <SlideBuilder
            slideLength={this.state.slideLength}
            genre={genre}
            moviesList={this.state.moviesList}
            position={this.state.position}
            start={this.state.start}
            next={this.state.next}
            prev={this.state.prev}
            transitionEnd={this.handleTransitionEnd} />

          <span className='handle handleNext active'>
            <b className='indicator-icon icon-rightCaret'>
              <i className='fa fa-angle-right' onClick={this.handleNext}></i>
            </b>
          </span>
        </div>
      );

    } else {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          <span className='handle handlePrev active'>
            <b className='indicator-icon icon-rightCaret'>
              <i className='fa fa-angle-left' onClick={this.handlePrev}></i>
            </b>
          </span>

          <SlideBuilder
            slideLength={this.state.slideLength}
            genre={genre}
            moviesList={this.state.moviesList}
            position={this.state.position}
            start={this.state.start}
            next={this.state.next}
            prev={this.state.prev}
            transitionEnd={this.handleTransitionEnd} />

          <span className='handle handleNext active'>
            <b className='indicator-icon icon-rightCaret'>
              <i className='fa fa-angle-right' onClick={this.handleNext}></i>
            </b>
          </span>
        </div>
      );
    }
  }

  handleNext = () => {
    this.setState({
      next: true
    });
  }

  handlePrev = () => {
    this.setState({
      prev: true
    });
  }

  handleTransitionEnd = () => {
    console.log('Slider transition is over');
  
    const listLength = this.state.moviesList._length;
    let position = this.state.position;
    let next = this.state.next;
    let prev = this.state.prev;

    if (next) {
      if (position === listLength) {
        position = 1;
      } else {
        position++;
      }
    } else if (prev) {
      if (position === 1) {
        position = listLength;
      } else {
        position--;
      }
    }

    this.setState({
      position: position,
      start: false,
      next: false,
      prev: false
    });
  }

  componentDidUpdate() {
    console.log('GenreSlider updated');
    console.log(this.state);
  }
}

export default GenreSlider;
