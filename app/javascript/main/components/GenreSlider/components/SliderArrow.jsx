// app/javascript/main/scenes/Home/GenreSliders/components/SliderArrow.jsx

import React from 'react'
import PropTypes from 'prop-types'

const SliderArrow = (props) => {
  if (props.start) return null

  const buttonClass = `handle handle${props.direction} active`
  const iconClass = `fa fa-angle-${props.icon}`

  return (
    <span className={buttonClass}>
      <b className='indicator-icon icon-rightCaret'>
        <i
          className={iconClass}
          onClick={() => props.handleClick(props.direction)}
        ></i>
      </b>
    </span>
  )
}

SliderArrow.propTypes = {
  start: PropTypes.bool,
  direction: PropTypes.string,
  icon: PropTypes.string,
  handleClick: PropTypes.func
}

export default SliderArrow
