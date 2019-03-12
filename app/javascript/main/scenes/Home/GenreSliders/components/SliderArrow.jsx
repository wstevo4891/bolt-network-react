// app/javascript/main/scenes/Home/GenreSliders/components/SliderArrow.jsx

import React from 'react'

const SliderArrow = (props) => {
  if (props.start) return null

  const dir = props.direction

  const buttonClass = `handle handle${dir} active`
  const iconClass = `fa fa-angle-${props.icon}`

  return (
    <span className={buttonClass}>
      <b className='indicator-icon icon-rightCaret'>
        <i className={iconClass} onClick={() => props.handleClick(dir)}></i>
      </b>
    </span>
  )
}

export default SliderArrow
