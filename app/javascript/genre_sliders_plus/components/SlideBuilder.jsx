// app/javascript/genre_sliders_plus/components/SliderContainer.jsx

import React from 'react';

import * as actions from '../actions/buildSlides';
// import SliderContent from './SliderContent';
import SliderContainer from './SliderContainer';

const SlideBuilder = (props) => {
  const slides = actions.buildSlides(props);

  if (slides) {
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
  } else {
    return null;
  }
}

export default SlideBuilder;
