import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@components'

const SliderArrow = (props) => {
  if (props.start) return null

  return (
    <span className={`handle handle${props.direction} active`}>
      <b className='indicator-icon icon-rightCaret'>
        <Icon
          icon={props.icon}
          handleClick={props.handleClick}
        />
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
