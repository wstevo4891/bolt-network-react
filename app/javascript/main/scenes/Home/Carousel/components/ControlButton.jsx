// app/javascript/main/scenes/Home/Carousel/compoents/ControlButton.jsx

import React from 'react'

const ControlButton = (props) => {
  const iconClass = props.direction === 'prev' ? 'fa-angle-left' : 'fa-angle-right'

  return(
    <a
      className={`carousel-control-${props.direction}`}
      role="button"
      tabIndex="0"
      onClick={props.onClickHandler}
    >
      <span className={`fa ${iconClass} slider-arrow slider-${props.direction}`}>
        <span className="sr-only">{props.directonText}</span>
      </span>
    </a>
  )
}

export default ControlButton
