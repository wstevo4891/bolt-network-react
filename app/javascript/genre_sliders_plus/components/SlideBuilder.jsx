// app/javascript/genre_sliders_plus/components/SliderContainer.jsx

import React from 'react';

import SlidesArray from '../services/SlidesArray';
// import SliderContent from './SliderContent';
import SliderContainer from './SliderContainer';

const SlideBuilder = (props) => {
  if (props.moviesList === null) return null;

  const slides = new SlidesArray(props).call();

  return (
    <div className="slider-container">
      <SliderContainer
        genre={props.genre}
        slides={slides}
        slideLength={props.slideLength}
        next={props.next}
        prev={props.prev}
        start={props.start}
        transitionEnd={props.transitionEnd} />
    </div>
  );
}

export default SlideBuilder;
