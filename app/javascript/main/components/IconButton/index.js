// Icon Button Component

import React from 'react'
import PropTypes from 'prop-types'

import makeToggleable from '@helpers/makeToggleable'

import Button from '../Button'
import Icon from '../Icon'

const IconButton = (props) => (
  <Button {...props.buttonProps}>
    {props.textPlacement === 'left' && props.text}
    <Icon {...props.iconProps} />
    {props.textPlacement === 'right' && props.text}
  </Button>
)

IconButton.propTypes = {
  buttonProps: PropTypes.shape(Button.propTypes).isRequired,
  iconProps: PropTypes.shape(Icon.propTypes).isRequired,
  text: PropTypes.string,
  textPlacement: PropTypes.oneOf(['left', 'right']),
}

IconButton.defaultProps = {
  text: null,
  textPlacement: 'right',
}

const SwitchIconButton = (props) => {
  const icon = props.status ? props.options[0] : props.options[1]

  return (
    <IconButton
      buttonProps={{
        ...props.buttonProps,
        handleClick: props.handleClick,
      }}
      iconProps={{ ...props.iconProps, icon }}
      text={props.text}
      textPlacement={props.textPlacement}
    />
  )
}

SwitchIconButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.bool.isRequired,
  buttonProps: PropTypes.object,
  handleClick: PropTypes.func,
  iconProps: PropTypes.object,
  text: PropTypes.string,
  textPlacement: PropTypes.oneOf(['left', 'right']),
}

SwitchIconButton.defaultProps = {
  buttonProps: {},
  handleClick: () => void {},
  iconProps: {},
  text: null,
  textPlacement: 'right',
}

const ToggleIconButton = makeToggleable(SwitchIconButton)

export {
  IconButton,
  SwitchIconButton,
  ToggleIconButton,
}
