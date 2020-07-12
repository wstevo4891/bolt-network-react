// Icon Button Component

import React from 'react'
import PropTypes from 'prop-types'

import makeToggleable from '@helpers/makeToggleable'

import Icon from '../Icon'

const IconButton = (props) => (
  <button
    className={props.buttonClass}
    id={props.id}
    onClick={props.handleClick}
  >
    <Icon {...props.iconProps} />{props.text}
  </button>
)

IconButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  iconProps: PropTypes.shape(Icon.propTypes),
  id: PropTypes.string,
  buttonClass: PropTypes.string,
  text: PropTypes.string
}

IconButton.defaultProps = {
  buttonClass: null,
  id: null,
  text: null
}

const ToggleIconButton = makeToggleable(IconButton)

export {
  IconButton,
  ToggleIconButton
}
