// app/javascript/main/scenes/Home/GenreSliders/components/SliderArrow.jsx

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const SliderArrow = (props) => {
  if (props.start) return null

  const buttonClass = `handle handle${props.direction} active`
  // const iconClass = `fa fa-angle-${props.icon}`
  const buttonIcon = props.icon === 'left' ? faAngleLeft : faAngleRight

  return (
    <span className={buttonClass}>
      <b className='indicator-icon icon-rightCaret'>
        {/* <i className={iconClass} onClick={() => props.handleClick(dir)}></i> */}
        <FontAwesomeIcon
          icon={buttonIcon}
          onClick={() => props.handleClick(props.direction)}
        />
      </b>
    </span>
  )
}

export default SliderArrow
