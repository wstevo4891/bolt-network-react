import React from 'react';

import ContainerStyle from '../services/ContainerStyle';
import SlidesList from '../components/SlidesList';

const MidSlider = (props) => {
  const style = new ContainerStyle(props).call();

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

export default MidSlider;
