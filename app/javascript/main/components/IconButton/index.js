// Icon Button Component

import React from 'react'
import PropTypes from 'prop-types'

import makeToggleable from '@helpers/makeToggleable'

const IconButton = (props) => (
  <button
    className={props.buttonClass}
    onClick={props.handleClick}
  >
    <i className={`fa ${props.icon}`}></i>{props.text}
  </button>
)

IconButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
  text: PropTypes.string
}

IconButton.defaultProps = {
  buttonClass: '',
  text: ''
}

const ToggleIconButton = makeToggleable(IconButton)

export {
  IconButton,
  ToggleIconButton
}
