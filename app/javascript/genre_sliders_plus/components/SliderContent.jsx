// app/javascript/genre_sliders/components/SliderContent.jsx

import React from 'react';

import Poster from './Poster';
import PosterContainer from './PosterContainer';
import * as Styles from '../actions/buildContainerStyle';
// import * as Events from '../actions/whichTransitionEvent';

const SliderContent = (props) => {
  console.log('SliderContent is rendering!');
  const slides = props.slides;
  const slideOver = Styles.buildContainerStyle(props);

  if (slides && slides.length > 0) {
    if (props.next || props.prev) {
      return (
        <div className="sliderContent" style={slideOver}>
          {
            slides.map((slide, index) =>
              <Poster
                key={index}
                index={index}
                movie={slide}
                slideLength={props.slideLength}
                start={props.start}
                next={props.next}
                prev={props.prev}
                hoverItem={props.hoverItem}
                mouseOver={props.mouseOver}
                mouseOut={props.mouseOut} />
            )
          }
        </div>
      );
    } else {
      return (
        <div className="sliderContent" style={slideOver}>
          {
            slides.map((slide, index) =>
              <PosterContainer
                key={index}
                index={index}
                movie={slide}
                slideLength={props.slideLength}
                start={props.start}
                next={props.next}
                prev={props.prev}
                hoverItem={props.hoverItem}
                mouseOver={props.mouseOver}
                mouseOut={props.mouseOut} />
            )
          }
        </div>
      );
    }

  } else {
    return null;
  }
}

export default SliderContent;
