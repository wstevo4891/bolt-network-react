// app/javascript/genre_sliders_plus/components/SlideBuilderPlus.jsx

import React from 'react';

import SlidesArray from '../services/SlidesArray';

import StartSlider from '../sliders/StartSlider';
import NextSlider from '../sliders/NextSlider';
import PrevSlider from '../sliders/PrevSlider';
import MidSlider from '../sliders/MidSlider';
import SliderContainer from './SliderContainer';

const SlideBuilderPlus = (props) => {
  if (props.moviesList === null) return null;

  const slides = new SlidesArray(props).call();

  const renderSlider = (Slider) => {
    return (
      <div className="slider-container">
        <Slider
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

  if (props.next === false || props.prev === false) {
    return renderSlider(MidSlider);
  } else {
    return renderSlider(SliderContainer);
  }
}

export default SlideBuilderPlus;
