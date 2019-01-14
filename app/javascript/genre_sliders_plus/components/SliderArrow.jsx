// app/javascript/genre_sliders_plus/components/SliderArrow.jsx

import React from 'react';

const SliderArrow = (props) => {
  const buttonClass = `handle handle${props.direction} active`;
  const iconClass = `fa fa-angle-${props.icon}`;

  return (
    <span className={buttonClass}>
      <b className='indicator-icon icon-rightCaret'>
        <i className={iconClass} onClick={props.handleClick}></i>
      </b>
    </span>
  )
}

export default SliderArrow;
