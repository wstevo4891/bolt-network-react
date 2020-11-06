// Icon Button Component

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'

const LEFT = 'left'
const RIGHT = 'right'

const IconButton = (props) => (
  <Button {...props.buttonProps}>
    {props.textPlacement === LEFT && props.text}
    <Icon {...props.iconProps} />
    {props.textPlacement === RIGHT && props.text}
  </Button>
)

IconButton.propTypes = {
  buttonProps: PropTypes.shape(Button.propTypes).isRequired,
  iconProps: PropTypes.shape(Icon.propTypes).isRequired,
  text: PropTypes.string,
  textPlacement: PropTypes.oneOf([LEFT, RIGHT]),
}

IconButton.defaultProps = {
  text: null,
  textPlacement: RIGHT,
}

const ToggleIconButton = (props) => {
  const [status, setStatus] = useState(props.status)

  const handleClick = () => {
    setStatus(!status)
    props.callback()
  }

  const icon = status ? props.options[0] : props.options[1]

  return (
    <IconButton
      buttonProps={{
        ...props.buttonProps,
        handleClick,
      }}
      iconProps={{ ...props.iconProps, icon }}
      text={props.text}
      textPlacement={props.textPlacement}
    />
  )
}

ToggleIconButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonProps: PropTypes.object,
  callback: PropTypes.func,
  iconProps: PropTypes.object,
  status: PropTypes.bool,
  text: PropTypes.string,
  textPlacement: PropTypes.oneOf([LEFT, RIGHT]),
}

ToggleIconButton.defaultProps = {
  buttonProps: {},
  callback: () => void {},
  iconProps: {},
  status: true,
  text: null,
  textPlacement: RIGHT,
}

export {
  IconButton,
  ToggleIconButton,
}
