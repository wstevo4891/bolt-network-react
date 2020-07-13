// Icon Button Component

import React from 'react'
import PropTypes from 'prop-types'

import makeToggleable from '@helpers/makeToggleable'

import Button from '../Button'
import Icon from '../Icon'

function buildIconProps(icon, iconProps) {
  if (icon) {
    return Object.assign({}, iconProps, { icon })
  }

  return iconProps
}

function buildButtonProps(buttonProps, handleClick) {
  if (buttonProps.handleClick) return buttonProps

  return Object.assign({}, buttonProps, { handleClick })
}

const IconButton = (props) => {
  const propsForButton = buildButtonProps(props.buttonProps, props.handleClick)
  const propsForIcon = buildIconProps(props.icon, props.iconProps)

  return (
    <Button {...propsForButton}>
      {props.textPlacement === 'left' && props.text}
      <Icon {...propsForIcon} />
      {props.textPlacement === 'right' && props.text}
    </Button>
  ) 
}

IconButton.propTypes = {
  buttonProps: PropTypes.shape(Button.propTypes),
  handleClick: PropTypes.func,
  icon: PropTypes.string,
  iconProps: PropTypes.shape(Icon.propTypes),
  text: PropTypes.string,
  textPlacement: PropTypes.oneOf(['left', 'right']),
}

IconButton.defaultProps = {
  buttonProps: {},
  handleClick: () => void {},
  icon: null,
  iconProps: null,
  text: null,
  textPlacement: 'right',
}

const ToggleIconButton = makeToggleable(IconButton)

export {
  IconButton,
  ToggleIconButton
}
