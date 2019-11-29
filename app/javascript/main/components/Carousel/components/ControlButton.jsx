// app/javascript/main/scenes/Home/Carousel/compoents/ControlButton.jsx

import React from 'react'

const ControlButton = (props) => {
  const iconClass = props.direction === 'prev' ? 'fa-angle-left' : 'fa-angle-right'

  return(
    <button
      className={`carousel-control-${props.direction}`}
      tabIndex="0"
      onClick={props.handleClick}
    >
      <span className={`fa ${iconClass} slider-arrow slider-${props.direction}`}>
        <span className="sr-only">{props.directonText}</span>
      </span>
    </button>
  )
}

export default ControlButton
