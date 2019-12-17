// Icon Button Component

import React from 'react'
import PropTypes from 'prop-types'

const IconButton = (props) => (
  <button onClick={props.handleClick}>
    <i className={props.iconClass}></i>
  </button>
)

IconButton.propTypes = {
  handleClick: PropTypes.func,
  iconClass: PropTypes.string
}

export default IconButton
