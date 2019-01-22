// app/javascript/genre_sliders_plus/components/GenreSlider.jsx

import React, { Component } from 'react';

import SlideBuilderTwo from './SlideBuilderTwo';
import SliderArrow from './SliderArrow';

class GenreSliderTwo extends Component {
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
    const { genre, moviesList, slideLength,
            position, start, next, prev } = this.state;

    if (start) {
      return (
        <div id={`${genre.name}_slider`} className='genre-slider'>
          <SlideBuilderTwo
            slideLength={slideLength}
            moviesList={moviesList}
            position={position}
            start={start}
            next={next}
            prev={prev}
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

          <SlideBuilderTwo
            slideLength={slideLength}
            moviesList={moviesList}
            position={position}
            start={start}
            next={next}
            prev={prev}
            // transitionEnd={this.handleTransitionEnd}
          />

          <SliderArrow
            direction='Next'
            icon='right'
            handleClick={this.handleNext}
          />
        </div>
      );
    }
  }

  // Doesn't work so well. Causes a big jump in the UI
  // when it renders
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
    }, 2000);
  }

  handlePrev = () => {
    this.setState({
      prev: true
    });

    setTimeout(() => {
      this.handleTransitionEnd();
    }, 2000);
  }

  handleTransitionEnd = () => {
    console.log('Slider transition is over');

    const position = this.determinePosition();

    this.setState({
      position: position,
      start: false,
      next: false,
      prev: false
    });
  }

  determinePosition = () => {
    const listLength = this.state.moviesList._length;
    const { next, prev, position } = this.state;

    if (next) {
      if (position === listLength) {
        return 1;
      } else {
        return position + 1;
      }
    } else if (prev) {
      if (position === 1) {
        return listLength;
      } else {
        return position - 1;
      }
    }
  }

  componentDidUpdate() {
    console.log('GenreSlider updated');
    console.log(this.state);
  }
}

export default GenreSliderTwo;
