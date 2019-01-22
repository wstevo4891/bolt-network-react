// app/javascript/genre_sliders_plus/components/SlideBuilder.jsx

import React from 'react';

import SlidesArray from '../services/SlidesArray';
// import SliderContent from './SliderContent';
import SliderContainerTwo from './SliderContainerTwo';
// import SliderConMotion from './SliderConMotion';

const SlideBuilderTwo = (props) => {
  if (props.moviesList === null) return null;

  const slides = new SlidesArray(props).call();

  return (
    <div className="slider-container">
      <SliderContainerTwo
        slides={slides}
        slideLength={props.slideLength}
        next={props.next}
        prev={props.prev}
        start={props.start}
        // transitionEnd={props.transitionEnd}
      />
    </div>
  );
}

export default SlideBuilderTwo;
