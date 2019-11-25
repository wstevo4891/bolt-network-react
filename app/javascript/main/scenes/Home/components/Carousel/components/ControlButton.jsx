// app/javascript/main/scenes/Home/Carousel/compoents/ControlButton.jsx

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ControlButton = (props) => {
  const buttonIcon = props.direction === 'prev' ? faAngleLeft : faAngleRight

  return(
    <button
      className={`carousel-control-${props.direction}`}
      tabIndex="0"
      onClick={props.onClickHandler}
    >
      {/* <span className={`fa ${iconClass} slider-arrow slider-${props.direction}`}>
        <span className="sr-only">{props.directonText}</span>
      </span> */}
      <FontAwesomeIcon
        icon={buttonIcon}
        className={`slider-arrow slider-${props.direction}`}
      />
    </button>
  )
}

export default ControlButton
