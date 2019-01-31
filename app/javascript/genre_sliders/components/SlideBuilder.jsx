// app/javascript/genre_sliders_plus/components/SlideBuilder.jsx

import React from 'react';

import SlidesArray from '../services/SlidesArray';
import SliderContainer from './SliderContainer';

const SlideBuilder = (props) => {
  if (props.moviesList === null) return null;

  const slides = new SlidesArray(props).call();

  return (
    <div className="slider-container">
      <SliderContainer
        slides={slides}
        slideLength={props.slideLength}
        next={props.next}
        prev={props.prev}
        start={props.start}
      />
    </div>
  );
}

export default SlideBuilder;
