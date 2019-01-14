// app/javascript/genre_sliders_plus/components/GenreSlider.jsx

import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import SlideBuilder from './SlideBuilder';
import SliderArrow from './SliderArrow';

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

          <SliderArrow
            direction='Next'
            icon='right'
            handleClick={this.handleNext}
          />
        </div>
      );

    } else {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          <SliderArrow
            direction='Prev'
            icon='left'
            handleClick={this.handlePrev}
          />

          <SlideBuilder
            slideLength={this.state.slideLength}
            genre={genre}
            moviesList={this.state.moviesList}
            position={this.state.position}
            start={this.state.start}
            next={this.state.next}
            prev={this.state.prev}
            transitionEnd={this.handleTransitionEnd} />

          <SliderArrow
            direction='Next'
            icon='right'
            handleClick={this.handleNext}
          />
        </div>
      );
    }
  }

  renderPrevArrow = (start) => {
    if (start === false) {
      return (
        <SliderArrow
          direction='Prev'
          icon='left'
          handleClick={this.handlePrev}
        />
      )
    }
  }

  handleNext = () => {
    this.setState({
      next: true
    });

    setTimeout(() => {
      this.handleTransitionEnd();
    }, 1000);
  }

  handlePrev = () => {
    this.setState({
      prev: true
    });

    setTimeout(() => {
      this.handleTransitionEnd();
    }, 1000);
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
