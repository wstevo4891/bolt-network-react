import React from 'react';

import SlidesList from '../components/SlidesList';

const StartSlider = (props) => {
  const style = { transform: 'translate3d(0%, 0px, 0px)' }

  return (
    <SlidesList
      style={style}
      slides={props.slides}
      slideLength={props.slideLength}
      next={props.next}
      prev={props.prev}
      start={props.start}
    />
  );
}

export default StartSlider;
